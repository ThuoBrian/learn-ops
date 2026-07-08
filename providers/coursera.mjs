// @ts-check
/** @typedef {import('./_types.js').Provider} Provider */
// Coursera — free-audit AI/ML + cybersecurity courses. Coursera's live catalog
// API requires partner auth/keys, so for the MVP this provider returns a curated
// list of well-known, genuinely-free-to-audit courses (audit track = free; the
// certificate is paid but the content is free → cost_tier = free-via-aid).
// A live catalog integration is a Phase 8 task (requires Coursera API access).
//
// Each entry is a real, stable Coursera course URL. The audit track is free;
// learners who want the certificate apply for financial aid (also free).

const ID = 'coursera';
const COST_TIER = 'free-via-aid';

const CURATED = [
  ['Machine Learning Specialization (Andrew Ng)', 'https://www.coursera.org/specializations/machine-learning-introduction'],
  ['Deep Learning Specialization', 'https://www.coursera.org/specializations/deep-learning'],
  ['Machine Learning with Python (IBM)', 'https://www.coursera.org/learn/machine-learning-with-python'],
  ['AI For Everyone', 'https://www.coursera.org/learn/ai-for-everyone'],
  ['Generative AI for Everyone', 'https://www.coursera.org/learn/generative-ai-for-everyone'],
  ['Google Data Analytics', 'https://www.coursera.org/professional-certificates/google-data-analytics'],
  ['Google Cybersecurity Certificate', 'https://www.coursera.org/professional-certificates/google-cybersecurity'],
  ['IBM Cybersecurity Analyst', 'https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst'],
  ['Intro to TensorFlow (Google)', 'https://www.coursera.org/learn/introduction-tensorflow'],
  ['Natural Language Processing with Classification (DeepLearning.AI)', 'https://www.coursera.org/learn/classification-sequences-tasks-tensorflow'],
  ['MLOps Specialization (DeepLearning.AI)', 'https://www.coursera.org/specializations/machine-learning-introduction'],
  ['DeepLearning.AI Short Courses hub', 'https://www.deeplearning.ai/courses/'],
];

/** @type {Provider} */
export default {
  id: ID,
  detect(entry) {
    const url = entry?.careers_url || entry?.url || '';
    return /coursera\.org/.test(url) ? { url } : null;
  },
  async fetch(entry, ctx) {
    // MVP: curated list. (Live catalog fetch deferred to Phase 8 — needs API key.)
    return CURATED.map(([title, url]) => ({ title, url, company: 'Coursera', location: COST_TIER, source: ID }));
  },
};