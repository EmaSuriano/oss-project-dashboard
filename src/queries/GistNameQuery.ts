import { gql } from 'apollo-boost';
import Gist from '../types/Gist';

export const Query = gql`
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
`;

export type QueryData = {
  viewer: {
    gists: {
      nodes: Gist[];
    };
  };
};
