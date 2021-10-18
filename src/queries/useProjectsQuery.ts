import { useQuery } from 'react-query';
import { buildProjectsQuery } from '../helpers/query';
import { Project } from '../types';
import { useSettingsQuery } from './useSettingsQuery';

const SUMMARY_INFO = `
  id
  url
  name
  pullRequests(first: 1, states:OPEN){
    totalCount
  }
  vulnerabilityAlerts(first: 1) {
    totalCount
  }
  issues(first: 1, states:OPEN) {
    totalCount
  }
  stargazers(last:3) {
    totalCount
    nodes {
      id
      name
      avatarUrl
    }
  }
`;

export const useProjectsQuery = () => {
  const settingsQuery = useSettingsQuery();

  const projectsDataQuery = useQuery(
    'projects',
    () =>
      buildProjectsQuery<Project>(settingsQuery.data?.projects!, SUMMARY_INFO),
    { enabled: Boolean(settingsQuery.data?.projects) },
  );

  return projectsDataQuery;
};
