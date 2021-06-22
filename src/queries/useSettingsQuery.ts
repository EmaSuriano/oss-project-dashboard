import { useQuery } from 'react-query';
import { PROJECT_FILE_NAME } from '../constants';
import { graphqlWithAuth } from '../helpers/graphql';
import { Gist, Settings } from '../types';

export type GistsQuery = {
  viewer: {
    gists: {
      nodes: Gist[];
    };
  };
};

export type GistQuery = {
  viewer: {
    gist: Gist;
  };
};

export const useSettingsQuery = () => {
  const gistsQuery = useQuery('gists', () =>
    graphqlWithAuth<GistsQuery>(`
      query {
        viewer {
          gists(first: 100) {
            nodes {
              name
              files {
                name
              }
            }
          }
        }
      }
    `),
  );

  const gist = gistsQuery.data?.viewer.gists.nodes.find(({ files }) =>
    files.find(({ name }) => name === PROJECT_FILE_NAME),
  );

  const gistQuery = useQuery(
    'gist',
    () =>
      graphqlWithAuth<GistQuery>(
        `query($name: String!) {
          viewer {
            gist(name: $name) {
              files {
                name
                text
              }
            }
          }
        }`,
        { name: gist?.name },
      ),
    { enabled: Boolean(gist) },
  );

  const gistContent = gistQuery.data?.viewer.gist.files[0].text;

  const settingQuery = useQuery(
    'setting',
    () => JSON.parse(gistContent!) as Settings,
    { enabled: Boolean(gistContent) },
  );

  return settingQuery;
};
