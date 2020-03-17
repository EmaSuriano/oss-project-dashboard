import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { isQueryReady, edgesToArray } from '../utils/queries';
import { PROJECT_FILE_NAME, isProjectsFile } from '../utils/projects';

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

const getProjectsGist = () => {
  const gistsQuery = useQuery(GISTS_QUERY);

  if (isQueryReady(gistsQuery)) {
    gistsQuery.output = edgesToArray(
      gistsQuery.data.viewer.gists,
    ).find(({ files }) => files.find(isProjectsFile));

    if (!gistsQuery.output) {
      gistsQuery.error = `No "${PROJECT_FILE_NAME}" file found inside your Github Gists`;
    }
  }

  return gistsQuery;
};

export default getProjectsGist;
