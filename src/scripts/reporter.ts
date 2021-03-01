import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
import {
  Query as GistNameQuery,
  QueryData as GistQueryData,
} from '../queries/GistNameQuery';
import {
  Query as ProjectQuery,
  QueryData as ProjectQueryData,
} from '../queries/ProjectQuery';
import {
  Query as RepositoriesQuery,
  QueryData as RepositoriesQueryData,
} from '../queries/RepositoriesQuery';

import { projectNameToParts } from '../utils/string';
import { PROJECT_FILE_NAME } from '../utils/constant';
import { writeFileSync } from 'fs';

const { REACT_APP_GITHUB_ACCESS_TOKEN: accessToken } = process.env;

const COLUMNS = [
  { label: 'Name', value: 'name' },
  { label: 'Issues', value: 'issues.totalCount' },
  { label: 'Vulnerabilities', value: 'vulnerabilityAlerts.totalCount' },
  { label: 'Pulls', value: 'pullRequests.totalCount' },
  { label: 'Stargazers', value: 'stargazers.totalCount' },
];

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext(() => ({
      headers: {
        authorization: `token ${accessToken}`,
      },
    }));
  },
});

function get(obj: Record<string, any>, key: string) {
  return key.split('.').reduce(function (o, x) {
    return typeof o == 'undefined' || o === null ? o : o[x];
  }, obj);
}

const main = async () => {
  const gistQuery = await client.query<GistQueryData>({ query: GistNameQuery });
  const gist = gistQuery.data.viewer.gists.nodes.find(({ files }) =>
    files.find(({ name }) => name === PROJECT_FILE_NAME),
  );
  const { name } = gist || {};

  const projectsQuery = await client.query<ProjectQueryData>({
    query: ProjectQuery,
    variables: { name },
  });
  const gistFiles = projectsQuery.data.viewer.gist.files;
  const { projects } = JSON.parse(gistFiles[0].text) as { projects: string[] };

  const repositoriesQuery = await client.query<RepositoriesQueryData>({
    query: RepositoriesQuery(projects),
  });
  const projectsWithData = projects
    .map((projectName) => {
      const { key } = projectNameToParts(projectName);
      return repositoriesQuery.data![key];
    })
    .filter(Boolean);

  const reportLines = [
    `| ${COLUMNS.map((col) => `${col.label}`).join(' | ')} |`,
    `| ${COLUMNS.map(() => '-----').join(' | ')} |`,
    ...projectsWithData.map(
      (project) =>
        `| ${COLUMNS.map((col) => `${get(project, col.value)}`).join(' | ')} |`,
    ),
  ];

  writeFileSync('report.md', reportLines.join('\n'));
  console.log('Report saved!');
};

main();
