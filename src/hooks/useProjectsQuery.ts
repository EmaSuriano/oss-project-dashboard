import { loadingFromQueries, errorsFromQueries } from '../utils/queries';
import { QueryResult } from '@apollo/react-common';
import Project from '../types/Project';
import useGistNameQuery from './useGistNameQuery';
import useSettingsQuery from './useSettingsQuery';
import useProjectDataQuery from './useProjectDataQuery';
import Settings from '../types/Settings';

type ProjectsResult = QueryResult<{
  projects: Project[];
  settings: Settings;
}>;

const useProjectsQuery = () => {
  const gistNameQuery = useGistNameQuery();
  const settingsQuery = useSettingsQuery(gistNameQuery.output);
  const projectDataQuery = useProjectDataQuery(settingsQuery.output.projects);

  const loading = loadingFromQueries(
    gistNameQuery,
    settingsQuery,
    projectDataQuery,
  );

  const error = errorsFromQueries(
    gistNameQuery,
    settingsQuery,
    projectDataQuery,
  );

  const result: ProjectsResult = Object.assign(
    projectDataQuery as QueryResult,
    {
      loading,
      error,
      data: {
        projects: projectDataQuery.output,
        settings: settingsQuery.output,
      },
    },
  );

  return result;
};

export default useProjectsQuery;
