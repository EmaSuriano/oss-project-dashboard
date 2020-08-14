import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-boost';
import { PROJECT_FILE_NAME, EMPTY_SETTINGS } from '../utils/constant';
import { Settings } from '../types/Settings';
import validateSettings from '../types/Settings.validator';
import { Query, QueryData } from '../queries/ProjectQuery';

type SettingsQueryResult = QueryResult<QueryData> & { output: Settings };

const useSettingsQuery = (gistName: string) => {
  const projectsQuery = useQuery<QueryData>(Query, {
    variables: { name: gistName },
    skip: !gistName,
  });

  const result: SettingsQueryResult = Object.assign(projectsQuery, {
    output: EMPTY_SETTINGS,
  });

  if (isQueryReady(projectsQuery)) {
    const { viewer } = projectsQuery.data!;

    const gistFile = viewer.gist.files[0];
    const gistContent = JSON.parse(gistFile.text);

    try {
      const settings = validateSettings(gistContent);
      result.output = settings;
    } catch (error) {
      result.error = new ApolloError({
        errorMessage: `Problem while parsing "${PROJECT_FILE_NAME}" content: ${error}`,
      });
    }
  }

  return result;
};

export default useSettingsQuery;
