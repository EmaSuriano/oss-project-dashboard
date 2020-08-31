import { loadingFromQueries, errorsFromQueries } from '../utils/queries';
import { QueryResult } from '@apollo/react-common';
import Project from '../types/Project';
import useGistNameQuery from './useGistNameQuery';
import useSettingsQuery from './useSettingsQuery';
import useProjectDataQuery from './useProjectDataQuery';
import Settings from '../types/Settings';

type ProjectsResult = QueryResult & {
  data: { projects: Project[]; settings: Settings };
};

const useProjectsQuery = (): ProjectsResult => {
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

  return {
    ...projectDataQuery,
    loading,
    error,
    data: {
      projects: projectDataQuery.output,
      settings: settingsQuery.output,
    },
  };
};

export default useProjectsQuery;
