import { useQuery } from 'react-query';
import { graphqlWithAuth } from '../helpers/graphql';
import { Project } from '../types';
import { useSettingsQuery } from './useSettingsQuery';

const PROJECT_INFO = `
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

const Query = (projects: string[]) => `
  query {
  __typename
  ${projects
    .map((project) => {
      const [user, name] = project.split('/');
      const key = name.replace(/-/g, '');

      return `${key}: repository(name: "${name}", owner: "${user}") {
        ${PROJECT_INFO}
      }`;
    })
    .join('\n')}
}`;

export type ProjectsQuery = Record<string, Project>;

export const useProjectsQuery = () => {
  const settingsQuery = useSettingsQuery();

  const projectsDataQuery = useQuery(
    'projectsData',
    () => graphqlWithAuth<ProjectsQuery>(Query(settingsQuery.data?.projects!)),
    { enabled: Boolean(settingsQuery.data?.projects) },
  );

  const projectsQuery = useQuery(
    'projects',
    () =>
      Object.values(projectsDataQuery.data!).filter(
        (x, i) => Boolean(x) && i !== 0,
      ),
    { enabled: Boolean(projectsDataQuery.data) },
  );

  return projectsQuery;
};
