import { gql } from 'apollo-boost';

export const Query = gql`
  query {
    viewer {
      login
      avatarUrl
      url
      email
    }
  }
`;

export type QueryData = {
  viewer: {
    login: string;
    avatarUrl: string;
    url: string;
    email: string;
  };
};
