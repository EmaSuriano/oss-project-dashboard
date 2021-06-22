import { graphql } from '@octokit/graphql';

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  },
});
