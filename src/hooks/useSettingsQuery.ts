import { isQueryReady } from '../utils/queries';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-boost';
import { EMPTY_SETTINGS } from '../utils/constant';
import { Settings } from '../types/Settings';
import validateSettings from '../types/Settings.validator';
import { QueryData } from '../queries/ProjectQuery';
import useGistQuery from './useGistQuery';
import { INVALID_SETTINGS_ERROR } from '../utils/error';

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
      return {
        ...gistQuery,
        error: new ApolloError({
          errorMessage: INVALID_SETTINGS_ERROR,
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
