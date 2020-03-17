import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PROJECT_FILE_NAME, isProjectsFile } from '../utils/projects';

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

const getProjectsFromQuery = (projectsQuery, onError) => {
  try {
    return isQueryReady(projectsQuery)
      ? JSON.parse(
          projectsQuery.data.viewer.gist.files.find(isProjectsFile).text,
        )
      : [];
  } catch (error) {
    onError(error);
    return [];
  }
};

const getProjectsList = gistName => {
  const projectsQuery = useQuery(PROJECT_QUERY, {
    variables: { name: gistName },
    skip: !gistName,
  });

  const onError = () => {
    projectsQuery.error = `Problem while parsing "${PROJECT_FILE_NAME}" content`;
  };

  projectsQuery.output = getProjectsFromQuery(projectsQuery, onError);
  return projectsQuery;
};

export default getProjectsList;
