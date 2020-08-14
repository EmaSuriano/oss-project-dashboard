import { ApolloError } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { isQueryReady } from '../utils/queries';
import { PROJECT_FILE_NAME } from '../utils/constant';
import { Query, QueryData } from '../queries/GistNameQuery';

type GistNameQueryResult = QueryResult<QueryData> & { output: string };

const useGistNameQuery = () => {
  const gistsQuery = useQuery<QueryData>(Query);
  const result: GistNameQueryResult = Object.assign(gistsQuery, { output: '' });

  if (isQueryReady(gistsQuery)) {
    const { viewer } = gistsQuery.data!;

    const gist = viewer.gists.nodes.find(({ files }) =>
      files.find(({ name }) => name === PROJECT_FILE_NAME),
    );

    if (!gist) {
      result.error = new ApolloError({
        errorMessage: `No "${PROJECT_FILE_NAME}" file found inside your Github Gists`,
      });
      return result;
    }

    result.output = gist.name;
  }

  return result;
};

export default useGistNameQuery;
