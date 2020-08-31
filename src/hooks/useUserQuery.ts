import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { isQueryReady } from '../utils/queries';
import { Query, QueryData } from '../queries/UserQuery';
import User from '../types/User';

type GistNameQueryResult = QueryResult<QueryData> & { output?: User };

const useUserQuery = (): GistNameQueryResult => {
  const gistsQuery = useQuery<QueryData>(Query);

  if (isQueryReady(gistsQuery)) {
    const { viewer } = gistsQuery.data!;

    const user: User = {
      name: viewer.login,
      avatarUrl: viewer.avatarUrl,
      url: viewer.url,
      email: viewer.email,
    };

    return {
      ...gistsQuery,
      output: user,
    };
  }

  return gistsQuery;
};

export default useUserQuery;
