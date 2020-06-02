import React from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { isQueryReady, edgesToArray } from '../utils/queries';
import { PROJECT_FILE_NAME } from '../utils/constant';

const GISTS_QUERY = gql`
  query {
    viewer {
      gists(first: 100) {
        nodes {
          name
          files {
            name
          }
        }
      }
    }
  }
`;

const isProjectsFile = ({ name: string }) => name === PROJECT_FILE_NAME;

/**
 * @returns Github gist name for the user config
 */
const useGistName = () => {
  const gistsQuery = useQuery(GISTS_QUERY);

  if (isQueryReady(gistsQuery)) {
    const gistWithProject = gistsQuery.data.viewer.gists.nodes.find(
      ({ files }) => files.find(isProjectsFile),
    );

    if (!gistWithProject) {
      gistsQuery.error = new ApolloError(
        `No "${PROJECT_FILE_NAME}" file found inside your Github Gists`,
      );
    }

    gistsQuery.output = gistWithProject.name;
  }

  return gistsQuery;
};

export default useGistName;
