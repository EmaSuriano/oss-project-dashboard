import { gql } from 'apollo-boost';
import Gist from '../types/Gist';

export const Query = gql`
  query($name: String!) {
    viewer {
      gist(name: $name) {
        files {
          name
          text
        }
      }
    }
  }
`;

export type QueryData = {
  viewer: {
    gist: Gist;
  };
};
