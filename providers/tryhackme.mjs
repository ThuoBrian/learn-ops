// @ts-check
/** @typedef {import('./_types.js').Provider} Provider */
// TryHackMe — gamified cybersecurity training with free learning paths and rooms.
// The catalog is JavaScript-rendered (React), so live scraping requires Playwright.
// This provider returns a curated list of confirmed free public learning paths.
// Live path discovery via Playwright is Phase 2.
// Reference: https://tryhackme.com/paths

const ID = 'tryhackme';
const COST_TIER = 'free';

const CURATED = [
  ['Cyber Security 101 (Beginner Path)', 'https://tryhackme.com/path/outline/cybersecurity101'],
  ['Pre-Security Fundamentals', 'https://tryhackme.com/path/outline/presecurity'],
  ['SOC Level 1 Analyst', 'https://tryhackme.com/path/outline/soclevel1'],
  ['Web Fundamentals', 'https://tryhackme.com/path/outline/web'],
  ['Introduction to Cybersecurity', 'https://tryhackme.com/path/outline/introduction-to-cyber-security'],
  ['Penetration Testing Basics', 'https://tryhackme.com/path/outline/beginner'],
  ['Jr Penetration Tester', 'https://tryhackme.com/path/outline/jrpenetrationtester'],
  ['Red Teaming Fundamentals', 'https://tryhackme.com/path/outline/redteaming'],
];

// Live path discovery via Playwright is Phase 2.

/** @type {Provider} */
export default {
  id: ID,
  detect(entry) {
    const url = entry?.careers_url || entry?.url || '';
    return /tryhackme\.com/.test(url) ? { url } : null;
  },
  async fetch(entry, ctx) {
    return CURATED.map(([title, url]) => ({ title, url, company: 'TryHackMe', location: COST_TIER, source: ID }));
  },
};
