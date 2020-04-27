import {
  isQueryReady,
  errorsFromQueries,
  loadingFromQueries,
} from '../utils/queries';
import getProjectsData from './getProjectsData';
import getUserConfig from './getUserConfig';

const EMPTY_DATA = {
  projects: [],
};

const getProjects = () => {
  const gistDataQuery = getUserConfig();
  const projectList = isQueryReady(gistDataQuery)
    ? gistDataQuery.output.projects
    : [];

  const projectsDataQuery = getProjectsData(projectList);

  return {
    error: errorsFromQueries(projectsDataQuery, gistDataQuery),
    loading: loadingFromQueries(projectsDataQuery, gistDataQuery),
    data: isQueryReady(projectsDataQuery)
      ? {
          projects: projectsDataQuery.output,
          threshold: gistDataQuery.output.threshold,
        }
      : EMPTY_DATA,
  };
};

export default getProjects;
