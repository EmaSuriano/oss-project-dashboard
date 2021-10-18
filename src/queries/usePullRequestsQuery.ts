import { useQuery } from 'react-query';
import { buildProjectsQuery } from '../helpers/query';
import { PullRequest } from '../types';
import { useSettingsQuery } from './useSettingsQuery';

export type ProjectWithPullRequest = {
  pullRequests: {
    nodes: PullRequest[];
  };
};

const PULL_REQUEST_INFO = `
  id
  pullRequests(last: 20, states:OPEN) {
    nodes {
      id
      title
      url
      createdAt
      repository { 
        url
        name
      }
      author {
        login
        avatarUrl
      }
    }
  }
`;

export const usePullRequestsQuery = () => {
  const settingsQuery = useSettingsQuery();

  const pullRequestsQuery = useQuery(
    'pullRequests',
    () =>
      buildProjectsQuery<ProjectWithPullRequest>(
        settingsQuery.data?.projects!,
        PULL_REQUEST_INFO,
      ).then((data) => data.flatMap((project) => project.pullRequests.nodes)),
    { enabled: Boolean(settingsQuery.data?.projects) },
  );

  return pullRequestsQuery;
};
