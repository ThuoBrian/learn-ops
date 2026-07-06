// @ts-check
/** @typedef {import('./_types.js').Provider} Provider */
// Kaggle Learn — free, server-side course catalog. https://www.kaggle.com/learn
// Each course is free, browser-based, ~3-7 hours. We fetch the catalog HTML and
// parse /learn/<slug> links; on any fetch/parse failure we fall back to a curated
// list of stable, well-known Kaggle Learn courses (all genuinely free).

import { fetchText } from './_http.mjs';

const ID = 'kaggle';
const CATALOG = 'https://www.kaggle.com/learn';
const COST_TIER = 'free';

const FALLBACK = [
  ['Python', 'https://www.kaggle.com/learn/python'],
  ['Pandas', 'https://www.kaggle.com/learn/pandas'],
  ['Data Visualization', 'https://www.kaggle.com/learn/data-visualization'],
  ['Intro to Machine Learning', 'https://www.kaggle.com/learn/intro-to-machine-learning'],
  ['Intermediate Machine Learning', 'https://www.kaggle.com/learn/intermediate-machine-learning'],
  ['Feature Engineering', 'https://www.kaggle.com/learn/feature-engineering'],
  ['Intro to Deep Learning', 'https://www.kaggle.com/learn/intro-to-deep-learning'],
  ['Computer Vision', 'https://www.kaggle.com/learn/computer-vision'],
  ['Time Series', 'https://www.kaggle.com/learn/time-series'],
  ['Machine Learning Explainability', 'https://www.kaggle.com/learn/machine-learning-explainability'],
  ['Natural Language Processing', 'https://www.kaggle.com/learn/natural-language-processing'],
  ['Intro to SQL', 'https://www.kaggle.com/learn/intro-to-sql'],
  ['Advanced SQL', 'https://www.kaggle.com/learn/advanced-sql'],
  ['Intro to AI Ethics', 'https://www.kaggle.com/learn/intro-to-ai-ethics'],
  ['Intro to Game AI and Reinforcement Learning', 'https://www.kaggle.com/learn/intro-to-game-ai-and-reinforcement-learning'],
];

/** @type {Provider} */
export default {
  id: ID,
  detect(entry) {
    const url = entry?.careers_url || entry?.url || '';
    return /kaggle\.com\/learn/.test(url) ? { url } : null;
  },
  async fetch(entry, ctx) {
    const out = [];
    try {
      const html = await fetchText(CATALOG, ctx || {});
      const seen = new Set();
      const re = /href="\/learn\/([a-z0-9-]+)"[^>]*>\s*<[^>]+>\s*([^<]{3,80})/gi;
      let m;
      while ((m = re.exec(html)) && out.length < 40) {
        const slug = m[1];
        const title = m[2].trim();
        if (!slug || seen.has(slug) || /^(login|signup|settings)/i.test(slug)) continue;
        seen.add(slug);
        out.push({
          title: title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          url: `https://www.kaggle.com/learn/${slug}`,
          company: 'Kaggle',
          location: COST_TIER,
          source: ID,
        });
      }
    } catch (err) {
      console.error(`⚠️  kaggle: catalog fetch failed (${err.message}) — using curated fallback`);
    }
    if (out.length < 5) {
      return FALLBACK.map(([title, url]) => ({ title, url, company: 'Kaggle', location: COST_TIER, source: ID }));
    }
    return out;
  },
};