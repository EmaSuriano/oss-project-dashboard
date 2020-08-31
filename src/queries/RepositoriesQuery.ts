import { gql } from 'apollo-boost';
import Project from '../types/Project';
import { projectNameToParts } from '../utils/string';

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

export const Query = (projects: string[]) => gql`
query {
  __typename
  ${projects
    .map(projectNameToParts)
    .map(
      ({ user, name, key }) =>
        `${key}: repository(name: "${name}", owner: "${user}") {
        ${PROJECT_INFO}
      }`,
    )
    .join('\n')}
}
`;

export type QueryData = {
  [T: string]: Project;
};
