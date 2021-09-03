import { graphqlWithAuth } from '../helpers/graphql';

export type ProjectsQuery<T> = Record<string, T>;

const buildQuery = (projects: string[], info: string) => `
  query {
  __typename
  ${projects
    .map((project) => {
      const [user, name] = project.split('/');
      const key = name.replace(/-/g, '');

      return `${key}: repository(name: "${name}", owner: "${user}") {
        ${info}
      }`;
    })
    .join('\n')}
}`;

export const buildProjectsQuery = <T extends Object>(
  projects: string[],
  info: string,
) =>
  graphqlWithAuth<ProjectsQuery<T>>(buildQuery(projects, info)).then((data) =>
    Object.values(data).filter((x, i) => Boolean(x) && i !== 0),
  );
