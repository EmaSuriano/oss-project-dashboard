import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { isQueryReady, edgesToArray } from '../utils/queries';
import { PROJECT_FILE_NAME } from '../utils/constant';

const GISTS_QUERY = gql`
  query {
    viewer {
      gists(first: 100) {
        edges {
          node {
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

const isProjectsFile = ({ name }) => name === PROJECT_FILE_NAME;

/**
 * @returns Github gist name for the user config
 */
const getGistName = () => {
  const gistsQuery = useQuery(GISTS_QUERY);

  if (isQueryReady(gistsQuery)) {
    const gistWithProject = edgesToArray(
      gistsQuery.data.viewer.gists,
    ).find(({ files }) => files.find(isProjectsFile));

    if (!gistWithProject) {
      gistsQuery.error = `No "${PROJECT_FILE_NAME}" file found inside your Github Gists`;
    }

    gistsQuery.output = gistWithProject.name;
  }

  return gistsQuery;
};

export default getGistName;
