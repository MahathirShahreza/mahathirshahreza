/* ==================================================
   keyword.js — keyword lists for hidden/easter-egg
   interactions. Edit these lists to tune what triggers
   each hidden mode.
   ================================================== */

/* Typing one of these puts the AI into "waiting_name" mode. */
const BADWORDS = [
  "pantek", "anjiang", "anjing", "lawak", "kontol",
  "ngentod", "bangsat", "pepek", "poke", "monyet"
];

/* Typing one of these puts the AI into "waiting_love_name" mode. */
const LOVE_TRIGGERS = [
  "sayang", "cinta", "beb", "baby", "love",
  "love you", "i love you", "miss you", "kangen"
];

/* Accepted "correct" answers while in waiting_love_name mode.
   Matched case-insensitively against the trimmed user input. */
const LOVE_NAME_VARIANTS = [
  "febi", "bita", "ita", "itaa",
  "febita", "febita ayu sinta", "febita ayu", "ayu sinta"
];
