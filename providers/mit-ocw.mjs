// @ts-check
/** @typedef {import('./_types.js').Provider} Provider */
// MIT OpenCourseWare — free course materials from MIT (lecture notes, videos,
// problem sets). We fetch the OCW search results for machine-learning and
// deep-learning topics, parse course card hrefs, and dedup across both queries.
// On any fetch/parse failure we fall back to a curated list of confirmed AI/ML
// courses. All MIT OCW content is free under Creative Commons license.
// Reference: https://ocw.mit.edu/search/?q=machine+learning&type=course

import { fetchText } from './_http.mjs';

const ID = 'mit-ocw';
const COST_TIER = 'free';
const BASE = 'https://ocw.mit.edu';

const QUERIES = [
  `${BASE}/search/?q=machine+learning&type=course`,
  `${BASE}/search/?q=deep+learning&type=course`,
];

const FALLBACK = [
  ['Deep Learning (6.7960) Fall 2024', 'https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/'],
  ['Hands-On Deep Learning (15.773) Spring 2024', 'https://ocw.mit.edu/courses/15-773-hands-on-deep-learning-spring-2024/'],
  ['Introduction to Machine Learning (6.036) Fall 2020', 'https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/'],
  ['Introduction to Deep Learning (6.S191)', 'https://ocw.mit.edu/courses/6-s191-introduction-to-deep-learning-january-iap-2023/'],
  ['Linear Algebra (18.06)', 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/'],
  ['Natural Language Processing with Deep Learning (6.S898)', 'https://ocw.mit.edu/courses/6-s898-deep-learning-fall-2022/'],
  ['Probabilistic Systems Analysis (6.041)', 'https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/'],
  ['Computational Cognitive Science (9.66)', 'https://ocw.mit.edu/courses/9-66j-computational-cognitive-science-fall-2004/'],
];

/** @type {Provider} */
export default {
  id: ID,
  detect(entry) {
    const url = entry?.careers_url || entry?.url || '';
    return /ocw\.mit\.edu/.test(url) ? { url } : null;
  },
  async fetch(entry, ctx) {
    const seen = new Set();
    const out = [];

    for (const queryUrl of QUERIES) {
      try {
        const html = await fetchText(queryUrl, ctx || {});
        // OCW course hrefs: /courses/<dept>-<number>-<slug>-<term>-<year>/
        const re = /href="(\/courses\/[a-z0-9][a-z0-9-]{5,120}\/)"/gi;
        let m;
        while ((m = re.exec(html)) && out.length < 60) {
          const path = m[1];
          if (!path || seen.has(path)) continue;
          seen.add(path);
          // Derive a human title from the slug (e.g. "6-036-intro-to-ml-fall-2020")
          const slug = path.replace(/^\/courses\//, '').replace(/\/$/, '');
          const title = slug
            .replace(/^[\d][\d.-]*-/, '')  // strip course number prefix
            .replace(/-(?:fall|spring|summer|winter|january|iap)-?\d{4}$/i, '')  // strip term/year
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
          out.push({
            title: title || slug,
            url: `${BASE}${path}`,
            company: 'MIT OCW',
            location: COST_TIER,
            source: ID,
          });
        }
      } catch (err) {
        console.error(`⚠️  mit-ocw: search fetch failed for ${queryUrl} (${err.message})`);
      }
    }

    if (out.length < 5) {
      return FALLBACK.map(([title, url]) => ({ title, url, company: 'MIT OCW', location: COST_TIER, source: ID }));
    }
    return out;
  },
};
