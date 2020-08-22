import { gql } from 'apollo-boost';
import Gist from '../types/Gist';

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
