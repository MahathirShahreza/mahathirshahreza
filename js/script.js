/* ==================================================
   script.js — app bootstrap only.
   All actual logic lives in:
     utils.js          — shared helpers
     keyword.js         — easter-egg keyword lists
     portfolio-data.js  — portfolio content + Q&A knowledge base
     ai-engine.js        — the FSM "brain" (no DOM)
     chat-ui.js          — DOM rendering + event wiring
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initIcons();
  renderIdentity();
  renderQuickActions();
  wireSearchForm();
  wireTopbar();
  wireCardDelegation();
  wireCertModal();
});
