import { isQueryReady } from '../utils/queries';
import getProjectsData from './getProjectsData';
import getProjectsGist from './getProjectsGist';
import getProjectsList from './getProjectsList';

const errorsFromQueries = (...queries) => queries.find(({ error }) => error);
const loadingFromQueries = (...queries) =>
  queries.find(({ loading }) => loading);

const getProjects = () => {
  const gistsQuery = getProjectsGist();

  const gistName = isQueryReady(gistsQuery) ? gistsQuery.output.name : '';
  const projectsListQuery = getProjectsList(gistName);

  const projectList = isQueryReady(projectsListQuery)
    ? projectsListQuery.output
    : [];
  const projectsDataQuery = getProjectsData(projectList);

  return {
    error: errorsFromQueries(projectsDataQuery, projectsListQuery, gistsQuery),
    loading: loadingFromQueries(
      projectsDataQuery,
      projectsListQuery,
      gistsQuery,
    ),
    data: projectsDataQuery.output,
  };
};

export default getProjects;
