import { isQueryReady } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { Query, QueryData } from '../queries/RepositoriesQuery';
import { QueryResult } from '@apollo/react-common';
import Project from '../types/Project';
import validateProject from '../types/Project.validator';
import { projectNameToParts } from '../utils/string';

type ProjectDataQueryResult = QueryResult<QueryData> & { output: Project[] };

const DEFAULT: string[] = [];

const useProjectDataQuery = (projects = DEFAULT): ProjectDataQueryResult => {
  const repositoriesQuery = useQuery<QueryData>(Query(projects), {
    skip: projects.length === 0,
  });

  if (isQueryReady(repositoriesQuery)) {
    const projectsWithData = projects
      .map((projectName) => {
        const { key } = projectNameToParts(projectName);
        return repositoriesQuery.data![key];
      })
      .filter(Boolean)
      .map(validateProject);

    return {
      ...repositoriesQuery,
      output: projectsWithData,
    };
  }

  return {
    ...repositoriesQuery,
    output: [],
  };
};

export default useProjectDataQuery;
