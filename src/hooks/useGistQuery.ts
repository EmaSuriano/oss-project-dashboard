import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-boost';
import { EMPTY_SETTINGS } from '../utils/constant';
import { Query, QueryData } from '../queries/ProjectQuery';
import { PARSING_GIST_ERROR } from '../utils/error';

type GistQueryResult = QueryResult<QueryData> & {
  output: Object;
};

const useGistQuery = (gistName: string): GistQueryResult => {
  const projectsQuery = useQuery<QueryData>(Query, {
    variables: { name: gistName },
    skip: !gistName,
  });

  if (isQueryReady(projectsQuery)) {
    const { viewer } = projectsQuery.data!;

    const [gistFile] = viewer.gist.files;

    try {
      const gistContent = JSON.parse(gistFile.text);
      return {
        ...projectsQuery,
        output: gistContent,
      };
    } catch (error) {
      return {
        ...projectsQuery,
        error: new ApolloError({
          errorMessage: PARSING_GIST_ERROR,
          extraInfo: error,
        }),
        output: EMPTY_SETTINGS,
      };
    }
  }

  return {
    ...projectsQuery,
    output: {},
  };
};

export default useGistQuery;
