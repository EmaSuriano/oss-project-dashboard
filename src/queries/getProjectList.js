import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { isQueryReady, edgesToArray } from '../utils/queries';

const PROJECT_FILE_NAME = 'oss-projects.json';

const GISTS_QUERY = gql`
  query {
    viewer {
      gists(first: 100) {
        edges {
          node {
            id
            name
            files {
              name
            }
          }
        }
      }
    }
  }
`;

const PROJECT_QUERY = gql`
  query($name: String!) {
    viewer {
      gist(name: $name) {
        files {
          name
          text
        }
      }
    }
  }
`;

const getProjectList = () => {
  const gistsQuery = useQuery(GISTS_QUERY);
  const projectGist =
    isQueryReady(gistsQuery) &&
    edgesToArray(gistsQuery.data.viewer.gists).find(({ files }) =>
      files.find(({ name }) => name === PROJECT_FILE_NAME),
    );

  const projectsQuery = useQuery(PROJECT_QUERY, {
    variables: { name: projectGist.name },
    skip: !isQueryReady(gistsQuery),
  });
  const projects = isQueryReady(projectsQuery)
    ? JSON.parse(
        projectsQuery.data.viewer.gist.files.find(
          ({ name }) => name === PROJECT_FILE_NAME,
        ).text,
      )
    : [];

  return {
    error: projectsQuery.error || gistsQuery.error,
    loading: projectsQuery.loading || gistsQuery.loading,
    projects,
  };
};

export default getProjectList;
