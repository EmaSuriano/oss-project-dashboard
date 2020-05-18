import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ProjectInfo = `
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
  stargazers(first:5) {
    totalCount
    nodes {
      id
      name
      avatarUrl
    }
  }
`;

const REPOSITORIES_QUERY = (projectList) => gql`
query {
  __typename 
  ${projectList
    .map((project) => {
      const [user, name] = project.split('/');
      const key = name.replace(/-/g, '');
      return `${key}: repository(name: "${name}", owner: "${user}") {
        ${ProjectInfo}
      }`;
    })
    .join('\n')}
}
`;
/**
 *
 * @param {string} projectList
 * @returns Project information
 */
const getProjectsData = (projectList = []) => {
  const repositoriesQuery = useQuery(REPOSITORIES_QUERY(projectList), {
    skip: projectList.length === 0,
  });

  repositoriesQuery.output = isQueryReady(repositoriesQuery)
    ? projectList
        .map((name) => {
          const key = name.split('/')[1].replace(/-/g, '');
          return repositoriesQuery.data[key];
        })
        .filter(Boolean)
    : [];

  return repositoriesQuery;
};

export default getProjectsData;
