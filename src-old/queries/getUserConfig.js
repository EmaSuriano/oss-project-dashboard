import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import getGistName from './getGistName';
import { gql } from 'apollo-boost';
import { PROJECT_FILE_NAME, GIST_SCHEMA } from '../utils/constant';
import Ajv from 'ajv';

const validateGist = new Ajv({ allErrors: true }).compile(GIST_SCHEMA);

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

const EMPTY_GIST = {
  projects: [],
};

const getProjectsFromQuery = (projectsQuery, onError) => {
  try {
    if (!isQueryReady(projectsQuery)) return EMPTY_GIST;

    const gistFile = projectsQuery.data.viewer.gist.files[0];
    const gistContent = JSON.parse(gistFile.text);

    if (!validateGist(gistContent)) onError(validateGist.errors);

    return gistContent;
  } catch (error) {
    onError(JSON.stringify(error));
    return [];
  }
};

/**
 * Validate gist structure and return the user config
 */
const getUserConfig = () => {
  const gistNameQuery = getGistName();

  const projectsQuery = useQuery(PROJECT_QUERY, {
    variables: { name: gistNameQuery.output },
    skip: !gistNameQuery.output,
  });

  const onError = (err) => {
    projectsQuery.error = `Problem while parsing "${PROJECT_FILE_NAME}" content: ${err}`;
  };

  projectsQuery.output = getProjectsFromQuery(projectsQuery, onError);
  projectsQuery.error = projectsQuery.error || gistNameQuery.error;
  projectsQuery.loading = projectsQuery.loading || gistNameQuery.loading;

  return projectsQuery;
};

export default getUserConfig;
