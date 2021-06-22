import { useQuery } from 'react-query';
import { graphqlWithAuth } from '../helpers/graphql';

type UserQuery = {
  viewer: {
    login: string;
    avatarUrl: string;
    url: string;
  };
};

export const useUserQuery = () =>
  useQuery('user', () =>
    graphqlWithAuth<UserQuery>(`
      query {
        viewer {
          login
          avatarUrl
          url
        }
      }
    `),
  );
