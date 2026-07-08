// @ts-check
/** @typedef {import('./_types.js').Provider} Provider */
// DeepLearning.AI — free short courses on LLM, RAG, MLOps, agents, embeddings.
// Short courses at learn.deeplearning.ai are 100% free (no paywall, no credit card).
// We attempt a live HTML fetch of the courses page; on failure or too-few results
// we fall back to a curated list of confirmed free short courses.
// Live catalog: https://www.deeplearning.ai/courses/?types=short_course

import { fetchText } from './_http.mjs';

const ID = 'deeplearning';
const CATALOG = 'https://www.deeplearning.ai/courses/';
const COST_TIER = 'free';

const FALLBACK = [
  ['ChatGPT Prompt Engineering for Developers', 'https://www.deeplearning.ai/courses/chatgpt-prompt-eng/'],
  ['Building Systems with the ChatGPT API', 'https://www.deeplearning.ai/courses/building-systems-with-chatgpt/'],
  ['LangChain for LLM Application Development', 'https://www.deeplearning.ai/courses/langchain-for-llm-application-development/'],
  ['Building and Evaluating Advanced RAG', 'https://www.deeplearning.ai/courses/building-evaluating-advanced-rag/'],
  ['LLMOps', 'https://www.deeplearning.ai/courses/llmops/'],
  ['AI Agents in LangGraph', 'https://www.deeplearning.ai/courses/ai-agents-in-langgraph/'],
  ['Embeddings for Dense Retrieval', 'https://www.deeplearning.ai/courses/large-language-models-semantic-search/'],
  ['Preprocessing Unstructured Data for LLM Applications', 'https://www.deeplearning.ai/courses/preprocessing-unstructured-data-for-llm-applications/'],
  ['Building Generative AI Applications with Gradio', 'https://www.deeplearning.ai/courses/building-generative-ai-applications-with-gradio/'],
  ['Finetuning Large Language Models', 'https://www.deeplearning.ai/courses/finetuning-large-language-models/'],
  ['Functions, Tools and Agents with LangChain', 'https://www.deeplearning.ai/courses/functions-tools-agents-langchain/'],
  ['Vector Databases: from Embeddings to Applications', 'https://www.deeplearning.ai/courses/vector-databases-embeddings-applications/'],
];

/** @type {Provider} */
export default {
  id: ID,
  detect(entry) {
    const url = entry?.careers_url || entry?.url || '';
    return /deeplearning\.ai/.test(url) ? { url } : null;
  },
  async fetch(entry, ctx) {
    const out = [];
    try {
      const html = await fetchText(CATALOG, ctx || {});
      const seen = new Set();
      // Match hrefs like href="/courses/some-slug/" or href="/courses/some-slug"
      const re = /href="\/courses\/([a-z0-9][a-z0-9-]{2,80})\/?"/gi;
      let m;
      while ((m = re.exec(html)) && out.length < 50) {
        const slug = m[1];
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        out.push({
          title,
          url: `https://www.deeplearning.ai/courses/${slug}/`,
          company: 'DeepLearning.AI',
          location: COST_TIER,
          source: ID,
        });
      }
    } catch (err) {
      console.error(`⚠️  deeplearning: catalog fetch failed (${err.message}) — using curated fallback`);
    }
    if (out.length < 5) {
      return FALLBACK.map(([title, url]) => ({ title, url, company: 'DeepLearning.AI', location: COST_TIER, source: ID }));
    }
    return out;
  },
};
