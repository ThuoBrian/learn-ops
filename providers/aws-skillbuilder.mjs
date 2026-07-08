// @ts-check
/** @typedef {import('./_types.js').Provider} Provider */
// AWS Skill Builder — free digital training for AI/ML and cloud (900+ courses).
// The full catalog requires Cognito authentication and AWS account API calls,
// so this provider uses a curated list of the top free AI/ML courses confirmed
// available without a subscription. Live catalog integration is Phase 2.
// Reference: https://skillbuilder.aws/ → filter "Free" + "AI/ML"

const ID = 'aws-skillbuilder';
const COST_TIER = 'free';

// Live catalog via AWS API is Phase 2 (requires Cognito auth).
const CURATED = [
  ['AWS Machine Learning Foundations', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/7065/machine-learning-foundations'],
  ['Introduction to Amazon SageMaker', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/1003/introduction-to-amazon-sagemaker'],
  ['Introduction to Generative AI with AWS', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/17763/introduction-to-generative-ai-art-of-the-possible'],
  ['Amazon Bedrock Getting Started', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/17508/amazon-bedrock-getting-started'],
  ['Fundamentals of Machine Learning and AI', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/15940/fundamentals-of-machine-learning-and-artificial-intelligence'],
  ['Machine Learning Pipeline on AWS', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/27/the-machine-learning-pipeline-on-aws'],
  ['Practical Data Science with Amazon SageMaker', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/1825/practical-data-science-with-amazon-sagemaker'],
  ['AWS Cloud Practitioner Essentials', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials'],
  ['Getting Started with AWS CloudFormation', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/3940/getting-started-with-aws-cloudformation'],
  ['Exam Prep: AWS Certified Machine Learning Specialty', 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/1755/exam-readiness-aws-certified-machine-learning-specialty'],
];

/** @type {Provider} */
export default {
  id: ID,
  detect(entry) {
    const url = entry?.careers_url || entry?.url || '';
    return /skillbuilder\.aws/.test(url) ? { url } : null;
  },
  async fetch(entry, ctx) {
    return CURATED.map(([title, url]) => ({ title, url, company: 'AWS Skill Builder', location: COST_TIER, source: ID }));
  },
};
