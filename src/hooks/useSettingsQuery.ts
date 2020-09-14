import { isQueryReady } from '../utils/queries';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-boost';
import { PROJECT_FILE_NAME, EMPTY_SETTINGS } from '../utils/constant';
import { Settings } from '../types/Settings';
import validateSettings from '../types/Settings.validator';
import { QueryData } from '../queries/ProjectQuery';
import useGistQuery from './useGistQuery';

type SettingsQueryResult = QueryResult<QueryData> & {
  output: Settings;
};

const useSettingsQuery = (gistName: string): SettingsQueryResult => {
  const gistQuery = useGistQuery(gistName);

  if (isQueryReady(gistQuery)) {
    try {
      const settings = validateSettings(gistQuery.output);
      return {
        ...gistQuery,
        output: settings,
      };
    } catch (error) {
      console.error(error);
      return {
        ...gistQuery,
        error: new ApolloError({
          errorMessage: `Invalid settings schema inside "${PROJECT_FILE_NAME}" content ...`,
          extraInfo: error,
        }),
        output: EMPTY_SETTINGS,
      };
    }
  }

  return {
    ...gistQuery,
    output: EMPTY_SETTINGS,
  };
};

export default useSettingsQuery;
