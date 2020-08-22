export const PROJECT_FILE_NAME = 'oss-projects.json';

export const GIST_SCHEMA = {
  type: 'object',
  required: ['projects'],
  projects: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  threshold: {
    type: 'object',
    pullRequests: 'number',
    issues: 'number',
  },
};
