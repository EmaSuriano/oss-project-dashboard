import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { isQueryReady } from '../utils/queries';
import { Query, QueryData } from '../queries/UserQuery';
import User from '../types/User';

type GistNameQueryResult = QueryResult<QueryData> & { output?: User };

const EMPTY_RESULT = {
  output: undefined,
};

const useUserQuery = () => {
  const gistsQuery = useQuery<QueryData>(Query);
  const result: GistNameQueryResult = Object.assign(EMPTY_RESULT, gistsQuery);

  if (isQueryReady(gistsQuery)) {
    const { viewer } = gistsQuery.data!;

    const user = {
      name: viewer.login,
      avatarUrl: viewer.avatarUrl,
      url: viewer.url,
      email: viewer.email,
    };

    result.output = user;
  }

  return result;
};

export default useUserQuery;
