/* ==================================================
   ai-engine.js — the "brain" of the assistant.
   No DOM here at all: given raw text (and the current
   state), it returns a plain result object describing
   what happened. chat-ui.js turns that into pixels.

   States:
     normal             — default, answers portfolio questions
     waiting_name        — just saw a badword, waiting for a name
     waiting_love_name   — just saw a love trigger, waiting for a name

   Result shapes returned by processInput():
     { type: 'badword_prompt',  text }
     { type: 'badword_reply',   text }
     { type: 'need_one_word',   text }
     { type: 'love_prompt',     text }
     { type: 'love_reply',      text }
     { type: 'love_reject',     text }
     { type: 'need_name_only',  text }
     { type: 'knowledge',       text, cards? }
     { type: 'unknown',         text }
     { type: 'unknown_limit',   text }
   ================================================== */

/* Matches free-text input against portfolioKnowledge's keyword lists
   (defined in portfolio-data.js). Category with the most keyword hits wins. */
function matchKnowledge(question) {
  const q = question.toLowerCase();
  let bestKey = null;
  let bestScore = 0;

  Object.entries(portfolioKnowledge).forEach(([key, entry]) => {
    const score = entry.keywords.reduce((acc, kw) => acc + (wordMatch(q, kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  });

  return bestKey ? portfolioKnowledge[bestKey].render() : null;
}

const AIEngine = (() => {
  // Chat memory: persists for as long as the page is open, resets on refresh.
  const memory = {
    state: "normal",          // normal | waiting_name | waiting_love_name
    history: [],              // [{ role: 'user'|'assistant', text }]
    pendingBadword: null,     // badword we're currently waiting on a name for
    lastTopic: null,          // last portfolio topic key that was answered
    lastBadword: null,        // most recent badword ever detected
    lastUnknownQuestion: null,// normalized text of the last unrecognized question
    unknownRepeatCount: 0     // how many times in a row it repeated
  };

  function findFirstBadword(q) {
    let best = null;
    let bestIndex = Infinity;
    BADWORDS.forEach((w) => {
      const idx = wordMatchIndex(q, w);
      if (idx !== -1 && idx < bestIndex) {
        bestIndex = idx;
        best = w;
      }
    });
    return best;
  }

  function findLoveTrigger(q) {
    return LOVE_TRIGGERS.find((w) => wordMatch(q, w)) || null;
  }

  function isKnownLoveName(answer) {
    const normalized = answer.trim().toLowerCase();
    return LOVE_NAME_VARIANTS.some((v) => v === normalized);
  }

  /* ---------- state handlers ---------- */

  function handleWaitingName(rawText) {
    const words = rawText.trim().split(/\s+/).filter(Boolean);
    if (words.length !== 1) {
      return { type: "need_one_word", text: "Please respond with one word only." };
    }
    const name = capitalize(words[0]);
    const badword = capitalize(memory.pendingBadword);
    memory.state = "normal";
    memory.pendingBadword = null;
    return { type: "badword_reply", text: `${badword} ang ${name} 🤣` };
  }

  function handleWaitingLoveName(rawText) {
    const trimmed = rawText.trim();
    const words = trimmed.split(/\s+/).filter(Boolean);

    if (isKnownLoveName(trimmed)) {
      memory.state = "normal";
      return { type: "love_reply", text: "❤️ I love you too, Febita Ayu Sinta." };
    }
    if (words.length > 2) {
      return { type: "need_name_only", text: "Please answer using your name only." };
    }
    memory.state = "normal";
    return { type: "love_reject", text: "❤️ Sorry, I love someone else.\nHer name is Febita Ayu Sinta." };
  }

  function handleUnknown(rawText) {
    const normalized = rawText.trim().toLowerCase();
    if (normalized === memory.lastUnknownQuestion) {
      memory.unknownRepeatCount++;
    } else {
      memory.lastUnknownQuestion = normalized;
      memory.unknownRepeatCount = 1;
    }

    if (memory.unknownRepeatCount >= 3) {
      // reset so the count doesn't just keep firing every single time after
      memory.unknownRepeatCount = 0;
      memory.lastUnknownQuestion = null;
      return {
        type: "unknown_limit",
        text: "Please ask another question.\n\nHere are some questions I can answer:"
      };
    }
    return { type: "unknown", text: "I couldn't find the answer." };
  }

  function handleNormal(rawText) {
    const q = rawText.toLowerCase();

    const badword = findFirstBadword(q);
    if (badword) {
      memory.state = "waiting_name";
      memory.pendingBadword = badword;
      memory.lastBadword = badword;
      return { type: "badword_prompt", text: "😂 What's your name?" };
    }

    const loveTrigger = findLoveTrigger(q);
    if (loveTrigger) {
      memory.state = "waiting_love_name";
      return { type: "love_prompt", text: "❤️ What's your name?" };
    }

    const knowledge = matchKnowledge(rawText);
    if (knowledge) {
      memory.unknownRepeatCount = 0;
      memory.lastUnknownQuestion = null;
      return { type: "knowledge", text: knowledge.text, cards: knowledge.cards };
    }

    return handleUnknown(rawText);
  }

  /* ---------- public API ---------- */

  function processInput(rawText, forcedTopic) {
    memory.history.push({ role: "user", text: rawText });

    let result;
    if (forcedTopic) {
      // Quick-action / suggestion buttons always short-circuit any pending
      // badword/love prompt and go straight to the requested topic.
      memory.state = "normal";
      memory.pendingBadword = null;
      memory.lastTopic = forcedTopic;
      result = portfolioKnowledge[forcedTopic].render();
      result = { type: "knowledge", text: result.text, cards: result.cards };
    } else if (memory.state === "waiting_name") {
      result = handleWaitingName(rawText);
    } else if (memory.state === "waiting_love_name") {
      result = handleWaitingLoveName(rawText);
    } else {
      result = handleNormal(rawText);
    }

    memory.history.push({ role: "assistant", text: result.text });
    return result;
  }

  function getMemory() {
    return memory;
  }

  return { processInput, getMemory };
})();
