import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { Query, QueryData } from '../queries/RepositoriesQuery';
import { QueryResult } from '@apollo/react-common';
import Project from '../types/Project';

type ProjectDataQueryResult = QueryResult<QueryData> & { output: Project[] };

const DEFAULT: string[] = [];
const EMPTY_OUTPUT = {
  output: [],
};

const useProjectDataQuery = (projects = DEFAULT) => {
  const repositoriesQuery = useQuery<QueryData>(Query(projects), {
    skip: projects.length === 0,
  });

  const result: ProjectDataQueryResult = Object.assign(
    EMPTY_OUTPUT,
    repositoriesQuery,
  );

  if (isQueryReady(repositoriesQuery)) {
    console.log('data', repositoriesQuery.data);
    // console.log('projects', projects);
    const projectsWithData = projects
      .map((name) => {
        const key = name.split('/')[1].replace(/-/g, '');
        return repositoriesQuery.data![key] as Project;
      })
      .filter(Boolean);
    // console.log('entered!', projectsWithData);
    result.output = projectsWithData;
  }

  return result;
};

export default useProjectDataQuery;
