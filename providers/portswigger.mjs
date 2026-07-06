// @ts-check
/** @typedef {import('./_types.js').Provider} Provider */
// PortSwigger Web Security Academy — free, server-side cybersecurity labs.
// https://portswigger.net/web-security/all-labs — free, browser-based, no login
// required for the academy materials. We fetch the all-labs page and parse topic
// links; on failure we fall back to a curated list of the academy's topic areas.

import { fetchText } from './_http.mjs';

const ID = 'portswigger';
const CATALOG = 'https://portswigger.net/web-security/all-labs';
const COST_TIER = 'free';

const FALLBACK = [
  ['SQL injection', 'https://portswigger.net/web-security/sql-injection'],
  ['Cross-site scripting (XSS)', 'https://portswigger.net/web-security/cross-site-scripting'],
  ['CSRF', 'https://portswigger.net/web-security/csrf'],
  ['SSRF', 'https://portswigger.net/web-security/ssrf'],
  ['HTTP request smuggling', 'https://portswigger.net/web-security/request-smuggling'],
  ['OS command injection', 'https://portswigger.net/web-security/os-command-injection'],
  ['Path traversal', 'https://portswigger.net/web-security/path-traversal'],
  ['File upload vulnerabilities', 'https://portswigger.net/web-security/file-upload'],
  ['Access control', 'https://portswigger.net/web-security/access-control'],
  ['Authentication', 'https://portswigger.net/web-security/authentication'],
  ['Business logic vulnerabilities', 'https://portswigger.net/web-security/business-logic-vulnerabilities'],
  ['Information disclosure', 'https://portswigger.net/web-security/information-disclosure'],
  ['Race conditions', 'https://portswigger.net/web-security/race-conditions'],
  ['JWT attacks', 'https://portswigger.net/web-security/jwt'],
  ['GraphQL API vulnerabilities', 'https://portswigger.net/web-security/graphql'],
];

/** @type {Provider} */
export default {
  id: ID,
  detect(entry) {
    const url = entry?.careers_url || entry?.url || '';
    return /portswigger\.net\/web-security/.test(url) ? { url } : null;
  },
  async fetch(entry, ctx) {
    const out = [];
    try {
      const html = await fetchText(CATALOG, ctx || {});
      const seen = new Set();
      const re = /href="\/web-security\/([a-z0-9-]+)"[^>]*>([^<]{3,80})/gi;
      let m;
      while ((m = re.exec(html)) && out.length < 40) {
        const slug = m[1];
        const title = m[2].trim();
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        out.push({
          title: title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          url: `https://portswigger.net/web-security/${slug}`,
          company: 'PortSwigger',
          location: COST_TIER,
          source: ID,
        });
      }
    } catch (err) {
      console.error(`⚠️  portswigger: catalog fetch failed (${err.message}) — using curated fallback`);
    }
    if (out.length < 5) {
      return FALLBACK.map(([title, url]) => ({ title, url, company: 'PortSwigger', location: COST_TIER, source: ID }));
    }
    return out;
  },
};