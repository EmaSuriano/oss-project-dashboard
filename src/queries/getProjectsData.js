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

const REPOSITORIES_QUERY = projects => gql`
query { 
  viewer { 
    id
    ${projects
      .map(
        name => `${name.replace(/-/g, '')}: repository(name: "${name}") {
      ${ProjectInfo}
    }`,
      )
      .join('\n')}
  }
}
`;

const getProjectsData = (projectList = []) => {
  const repositoriesQuery = useQuery(REPOSITORIES_QUERY(projectList), {
    skip: projectList.length === 0,
  });

  repositoriesQuery.output = isQueryReady(repositoriesQuery)
    ? projectList
        .map(name => repositoriesQuery.data.viewer[name.replace(/-/g, '')])
        .filter(Boolean)
    : [];

  return repositoriesQuery;
};

export default getProjectsData;
