import { ApolloError } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { isQueryReady } from '../utils/queries';
import { PROJECT_FILE_NAME } from '../utils/constant';
import { Query, QueryData } from '../queries/GistNameQuery';
import { GIST_NOT_FOUND_ERROR } from '../utils/error';

type GistNameQueryResult = QueryResult<QueryData> & { output: string };

const useGistNameQuery = (): GistNameQueryResult => {
  const gistsQuery = useQuery<QueryData>(Query);

  if (isQueryReady(gistsQuery)) {
    const { viewer } = gistsQuery.data!;

    const gist = viewer.gists.nodes.find(({ files }) =>
      files.find(({ name }) => name === PROJECT_FILE_NAME),
    );

    if (!gist) {
      return {
        ...gistsQuery,
        error: new ApolloError({
          errorMessage: GIST_NOT_FOUND_ERROR,
        }),
        output: '',
      };
    }

    return {
      ...gistsQuery,
      output: gist.name,
    };
  }

  return {
    ...gistsQuery,
    output: '',
  };
};

export default useGistNameQuery;
