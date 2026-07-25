/* ==================================================
   utils.js — small, dependency-free helper functions
   shared across ai-engine.js and chat-ui.js.
   ================================================== */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Word-boundary-safe matching:
   - single-word keywords ("hi", "love", "wa") are matched with \b boundaries,
     so "hi" won't match inside "this" and "love" won't match inside "lovely".
   - phrases ("who are you", "i love you") are matched as plain substrings,
     since false positives are far less likely with longer phrases. */
function wordMatch(text, keyword) {
  if (keyword.includes(" ")) return text.includes(keyword);
  const re = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
  return re.test(text);
}

/* Same idea as wordMatch, but also returns *where* the match starts.
   Used when we need "the first keyword typed", not just "a keyword". */
function wordMatchIndex(text, keyword) {
  if (keyword.includes(" ")) return text.indexOf(keyword);
  const re = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
  const m = re.exec(text);
  return m ? m.index : -1;
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function capitalize(word) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
