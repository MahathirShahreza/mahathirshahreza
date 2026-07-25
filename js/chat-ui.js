/* ==================================================
   chat-ui.js — everything DOM-related for the chat:
   bubbles, typing indicator, cards, the certificate
   modal, and the hero <-> chat morph animation.
   All "what should the AI say" decisions come from
   AIEngine (ai-engine.js); this file only renders them.
   ================================================== */

let chatStarted = false;

/* ---------- Loader ---------- */
function initLoader() {
  window.addEventListener("load", () => {
    document.getElementById("loader")?.classList.add("hidden");
  });
  setTimeout(() => document.getElementById("loader")?.classList.add("hidden"), 1200);
}

function initIcons() {
  if (window.lucide) lucide.createIcons();
  else window.addEventListener("load", () => window.lucide && lucide.createIcons());
}
function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

/* ---------- Populate identity (hero + topbar) from profile ---------- */
function renderIdentity() {
  document.getElementById("hero-avatar").innerHTML =
    `<img src="${profile.avatar}" alt="${profile.name}">`;

  document.getElementById("hero-name").textContent = profile.name;
  document.getElementById("hero-role").textContent = profile.subtitle;
  document.getElementById("hero-tagline").textContent = profile.tagline;

  document.getElementById("topbar-avatar").innerHTML =
    `<img src="${profile.avatar}" alt="${profile.name}">`;

  document.getElementById("topbar-name").textContent = profile.name;
  document.getElementById("topbar-role").textContent = profile.title;
}

/* ---------- Quick action cards ---------- */
function renderQuickActions() {
  const wrap = document.getElementById("quick-actions");
  wrap.innerHTML = quickActions.map((qa, i) => `
    <button class="qa-btn" data-topic="${qa.topic}" style="animation-delay:${0.25 + i * 0.04}s">
      <span class="qa-icon">${qa.icon}</span>
      <span>${qa.label}</span>
    </button>
  `).join("");
  wrap.querySelectorAll(".qa-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const qa = quickActions.find(q => q.topic === btn.dataset.topic);
      handleQuery(qa.label, qa.topic);
    });
  });
}

/* ---------- Search form (shared element between hero & chat) ---------- */
function wireSearchForm() {
  const form = document.getElementById("ask-form");
  const input = document.getElementById("ask-input");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    handleQuery(q);
  });
}

/* ---------- Topbar (home / clear) ---------- */
function wireTopbar() {
  document.getElementById("topbar-home").addEventListener("click", goToHero);
  document.getElementById("clear-chat").addEventListener("click", clearChat);
}

function goToHero() {
  document.body.classList.remove("chat-active");
  undockSearchBar();
}

function clearChat() {
  document.getElementById("chat-messages").innerHTML = "";
  chatStarted = false;
  goToHero();
}

/* ==================================================
   HERO <-> CHAT MORPH (FLIP technique on the shared
   #search-wrap element so it visually "moves up")
   ================================================== */
function enterChatMode() {
  if (!document.body.classList.contains("chat-active")) {
    document.body.classList.add("chat-active");
  }
  if (!chatStarted) {
    dockSearchBar();
    chatStarted = true;
  } else {
    // already docked from a previous turn, just make sure it's parented correctly
    const dock = document.getElementById("search-dock");
    const wrap = document.getElementById("search-wrap");
    if (wrap.parentElement !== dock) dock.appendChild(wrap);
  }
}

function dockSearchBar() {
  const wrap = document.getElementById("search-wrap");
  const dock = document.getElementById("search-dock");
  flip(wrap, () => {
    wrap.classList.remove("search-wrap--hero");
    dock.appendChild(wrap);
  });
}

function undockSearchBar() {
  const wrap = document.getElementById("search-wrap");
  const hero = document.querySelector(".hero-inner");
  const quickActionsEl = document.getElementById("quick-actions");
  flip(wrap, () => {
    wrap.classList.add("search-wrap--hero");
    hero.insertBefore(wrap, quickActionsEl);
  });
}

// Generic FLIP mover: measures before, runs `mutate` (which reparents/reclasses),
// measures after, then animates the delta back to zero.
function flip(el, mutate) {
  const first = el.getBoundingClientRect();
  mutate();
  const last = el.getBoundingClientRect();
  const dx = first.left - last.left;
  const dy = first.top - last.top;
  const sx = first.width / last.width || 1;
  const sy = first.height / last.height || 1;

  el.style.transition = "none";
  el.style.transformOrigin = "top left";
  el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  // force reflow so the browser registers the starting transform
  el.getBoundingClientRect();

  requestAnimationFrame(() => {
    el.style.transition = "transform 0.55s cubic-bezier(.2,.8,.2,1)";
    el.style.transform = "translate(0, 0) scale(1)";
  });

  el.addEventListener("transitionend", function done(e) {
    if (e.propertyName !== "transform") return;
    el.style.transition = "";
    el.style.transform = "";
    el.style.transformOrigin = "";
    el.removeEventListener("transitionend", done);
  });
}

/* ==================================================
   CHAT LOGIC — talks to AIEngine, renders the result
   ================================================== */
function handleQuery(displayText, forcedTopic) {
  enterChatMode();
  addUserBubble(displayText);

  // "Thinking..." style indicator, shown for ~0.9–1.6s before the AI "knows" the answer
  const typingEl = addTypingBubble();
  const delay = 900 + Math.random() * 700;

  setTimeout(() => {
    typingEl.remove();
    const result = AIEngine.processInput(displayText, forcedTopic);
    renderAIResult(result);
  }, delay);
}

function renderAIResult(result) {
  switch (result.type) {
    case "knowledge":
      typeBotBubble(result.text, () => {
        if (result.cards && result.cards.length) renderCards(result.cards);
      });
      break;
    case "unknown_limit":
      typeBotBubble(result.text, () => renderSuggestions());
      break;
    default:
      // badword_prompt, badword_reply, need_one_word, love_prompt,
      // love_reply, love_reject, need_name_only, unknown — all plain text
      typeBotBubble(result.text);
  }
}

/* ---------- Bubbles ---------- */
function addUserBubble(text) {
  const row = document.createElement("div");
  row.className = "msg-row user";
  row.innerHTML = `<div class="bubble user">${escapeHtml(text)}</div>`;
  getChatMessages().appendChild(row);
  scrollToBottom();
}

function addBotBubble(text) {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  row.innerHTML = `<div class="bubble bot">${escapeHtml(text)}</div>`;
  getChatMessages().appendChild(row);
  scrollToBottom();
}

/* Reveals the AI's answer one character at a time, ChatGPT-style,
   then calls onDone (used to drop cards in right after the text finishes). */
function typeBotBubble(text, onDone) {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  const bubble = document.createElement("div");
  bubble.className = "bubble bot typing-caret";
  row.appendChild(bubble);
  getChatMessages().appendChild(row);
  scrollToBottom();

  const chars = Array.from(text);
  const total = chars.length || 1;
  // scale speed so short replies feel snappy and long ones don't drag forever
  const perCharDelay = Math.max(8, Math.min(32, 1400 / total));
  let i = 0;

  (function step() {
    if (i < chars.length) {
      bubble.textContent += chars[i];
      i++;
      if (i % 3 === 0) scrollToBottom();
      setTimeout(step, perCharDelay);
    } else {
      bubble.classList.remove("typing-caret");
      scrollToBottom();
      if (onDone) onDone();
    }
  })();
}

const THINKING_LABELS = ["Thinking", "Searching", "Preparing answer"];

function addTypingBubble() {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  // randomly mix a plain dot-bubble with a labelled "Thinking..." style bubble
  const showLabel = Math.random() < 0.6;
  const label = showLabel ? THINKING_LABELS[Math.floor(Math.random() * THINKING_LABELS.length)] : "";
  row.innerHTML = `
    <div class="typing-bubble">
      ${label ? `<span class="typing-label">${label}</span>` : ""}
      <span class="typing-dots"><span></span><span></span><span></span></span>
    </div>`;
  getChatMessages().appendChild(row);
  scrollToBottom();
  return row;
}

function getChatMessages() { return document.getElementById("chat-messages"); }
function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

/* ---------- Card rendering (staggered, per-type) ---------- */
function renderCards(cards) {
  const row = document.createElement("div");
  row.className = "msg-row bot";

  const tagCards = cards.filter(c => c.type === "tag");
  const otherCards = cards.filter(c => c.type !== "tag");

  const stack = document.createElement("div");
  stack.className = "card-stack" + (otherCards.some(c => c.type === "project" || c.type === "skillgroup") ? " grid-2" : "");
  stack.style.width = "100%";

  let i = 0;
  otherCards.forEach(card => {
    stack.appendChild(buildCard(card, i));
    i++;
  });

  tagCards.forEach(course => {
  stack.appendChild(buildCard(course, i));
  i++;
});

  row.appendChild(stack);
  getChatMessages().appendChild(row);
  refreshIcons();
  scrollToBottom();
}

function buildCard(card, index) {
  const el = document.createElement("div");
  const delay = 0.05 * index;

  if (card.type === "project") {
    el.className = "result-card";
    el.style.animationDelay = `${delay}s`;
    el.innerHTML = `
      <div class="thumb">${card.image ? `<img src="${card.image}" alt="${card.title}" onerror="this.parentElement.textContent='${card.title.split(" ").slice(0,2).join(" ")}'">` : card.title.split(" ").slice(0,2).join(" ")}</div>
      <p class="card-title">${card.title}</p>
      <p class="card-desc">${card.description}</p>
      <div class="card-tags">${card.tags.map(t => `<span class="tag-pill">${t}</span>`).join("")}</div>
      <div class="card-actions">
        ${card.github ? `<a class="card-btn primary" href="${card.github}" target="_blank" rel="noopener"><i data-lucide="github" class="w-3.5 h-3.5"></i> GitHub</a>` : ""}
        ${card.demo ? `<a class="card-btn ghost" href="${card.demo}" target="_blank" rel="noopener"><i data-lucide="external-link" class="w-3.5 h-3.5"></i> Live Demo</a>` : ""}
        <button type="button" class="card-btn ghost" data-detail="${card.title.replace(/"/g, '&quot;')}">Detail</button>
      </div>
    `;
  } else if (card.type === "certificate") {
    el.className = "result-card compact cert-card";
    el.style.animationDelay = `${delay}s`;
    el.dataset.certIndex = card.index;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.innerHTML = `
      <div class="flex items-center gap-3">
        <i data-lucide="badge-check" class="w-5 h-5 text-accent"></i>
        <div>
          <p class="card-title">${card.title}</p>
          <p class="cert-issuer">${card.issuer} · ${card.date}</p>
        </div>
      </div>
      <button type="button" class="card-btn ghost" data-cert-open="${card.index}">View</button>
    `;
  } else if (card.type === "resume") {
    el.className = "result-card compact";
    el.style.animationDelay = `${delay}s`;
    el.innerHTML = `
      <div class="flex items-center gap-3">
        <i data-lucide="file-text" class="w-5 h-5 text-accent"></i>
        <p class="card-title">${profile.name} — CV</p>
      </div>
      <a
  class="card-btn primary"
  href="${card.file}"
  target="_blank"
  rel="noopener noreferrer"
>
  <i data-lucide="download" class="w-3.5 h-3.5"></i>
  View Resume
</a>
    `;
  } else if (card.type === "link") {
    el.className = "result-card compact";
    el.style.animationDelay = `${delay}s`;
    el.innerHTML = `
      <p class="card-title">${card.title}</p>
      <a class="card-btn ghost" href="${card.url}" target="_blank" rel="noopener">Open <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></a>
    `;
  } else if (card.type === "skillgroup") {
    el.className = "result-card";
    el.style.animationDelay = `${delay}s`;
    el.innerHTML = `
      <p class="card-title">${card.title}</p>
      <div class="skill-items">${card.items.map(i => `<span class="tag-pill">${i}</span>`).join("")}</div>
    `;
  } else if (card.type === "experience") {
    el.className = "result-card";
    el.style.animationDelay = `${delay}s`;
    el.innerHTML = `
      <span class="exp-period">${card.period}</span>
      <p class="card-title mt-1">${card.title}</p>
      <p class="exp-place">${card.place}</p>
      <ul class="exp-points">${card.points.map(p => `<li>${p}</li>`).join("")}</ul>
    `;
  }
  else if (card.type === "course") {
  el.className = "result-card";
  el.style.animationDelay = `${delay}s`;
  el.innerHTML = `
    <div class="flex items-center gap-3 mb-3">
      <i data-lucide="graduation-cap" class="w-5 h-5 text-accent"></i>
      <p class="card-title">${card.title}</p>
    </div>

    <p class="card-desc">${card.description}</p>
  `;
}
  return el;
}

/* ---------- Fallback suggestions ---------- */
function renderSuggestions() {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  const wrap = document.createElement("div");
  wrap.className = "suggest-row";
  wrap.style.width = "100%";
  wrap.innerHTML = suggestionTopics.map(topic => {
    const qa = quickActions.find(q => q.topic === topic);
    return `<button data-topic="${topic}">${qa.icon} ${qa.label}</button>`;
  }).join("");
  row.appendChild(wrap);
  getChatMessages().appendChild(row);

  wrap.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const qa = quickActions.find(q => q.topic === btn.dataset.topic);
      handleQuery(qa.label, qa.topic);
    });
  });
  scrollToBottom();
}

/* ---------- "Detail" button on project cards + certificate cards ----------
   Uses event delegation since cards are added dynamically. */
function wireCardDelegation() {
  const chatMessages = document.getElementById("chat-messages");

  chatMessages.addEventListener("click", (e) => {
    const certCard = e.target.closest(".cert-card");
    if (certCard) {
      const cert = certificates[Number(certCard.dataset.certIndex)];
      if (cert) openCertModal(cert);
      return;
    }

    const btn = e.target.closest("[data-detail]");
    if (!btn) return;
    const title = btn.dataset.detail;
    const project = projects.find(p => p.title === title);
    if (!project) return;

    addUserBubble(`Tell me more about "${project.title}"`);
    const typingEl = addTypingBubble();
    setTimeout(() => {
      typingEl.remove();
      typeBotBubble(project.description, () => {
        renderCards([{
          type: "project",
          title: project.title,
          description: project.description,
          tags: project.tech,
          image: project.image,
          github: project.github,
          demo: project.demo
        }]);
      });
    }, 700 + Math.random() * 500);
  });

  // keyboard access: Enter/Space on a focused certificate card opens the modal too
  chatMessages.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const certCard = e.target.closest(".cert-card");
    if (!certCard) return;
    e.preventDefault();
    const cert = certificates[Number(certCard.dataset.certIndex)];
    if (cert) openCertModal(cert);
  });
}

/* ==================================================
   CERTIFICATE DETAIL MODAL
   ================================================== */
function wireCertModal() {
  const overlay = document.getElementById("cert-modal");
  if (!overlay) return;

  document.getElementById("cert-modal-close").addEventListener("click", closeCertModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeCertModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) closeCertModal();
  });
}

function openCertModal(cert) {
  const overlay = document.getElementById("cert-modal");
  if (!overlay) return;

  const img = document.getElementById("cert-modal-image");
  img.src = cert.image || "";
  img.alt = `${cert.name} certificate preview`;
  img.onerror = () => {
    img.onerror = null;
    overlay.querySelector(".modal-preview").classList.add("no-image");
  };
  overlay.querySelector(".modal-preview").classList.remove("no-image");

  document.getElementById("cert-modal-title").textContent = cert.name;
  document.getElementById("cert-modal-issuer").textContent = cert.issuer || "—";
  document.getElementById("cert-modal-date").textContent = cert.date || "—";
  document.getElementById("cert-modal-id").textContent = cert.credentialId || "—";

  const downloadBtn = document.getElementById("cert-modal-download");
  downloadBtn.href = cert.file;
  downloadBtn.setAttribute("download", "");

  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("show");
  document.body.classList.add("modal-open");
  refreshIcons();
}

function closeCertModal() {
  const overlay = document.getElementById("cert-modal");
  if (!overlay) return;
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
