import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-boost';
import { PROJECT_FILE_NAME, EMPTY_SETTINGS } from '../utils/constant';
import { Settings } from '../types/Settings';
import validateSettings from '../types/Settings.validator';
import { Query, QueryData } from '../queries/ProjectQuery';

type SettingsQueryResult = QueryResult<QueryData> & { output: Settings };

const useSettingsQuery = (gistName: string): SettingsQueryResult => {
  const projectsQuery = useQuery<QueryData>(Query, {
    variables: { name: gistName },
    skip: !gistName,
  });

  if (isQueryReady(projectsQuery)) {
    const { viewer } = projectsQuery.data!;

    const gistFile = viewer.gist.files[0];
    const gistContent = JSON.parse(gistFile.text);

    try {
      const settings = validateSettings(gistContent);
      return {
        ...projectsQuery,
        output: settings,
      };
    } catch (error) {
      console.error(error);
      return {
        ...projectsQuery,
        error: new ApolloError({
          errorMessage: `There was a problem while parsing "${PROJECT_FILE_NAME}" content ...`,
          extraInfo: error,
        }),
        output: EMPTY_SETTINGS,
      };
    }
  }

  return {
    ...projectsQuery,
    output: EMPTY_SETTINGS,
  };
};

export default useSettingsQuery;
