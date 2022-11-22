import gql from 'graphql-tag';

export const FETCH_CHARACTERS_BY_ID = gql`
  query ($ids: [ID!]!){
    characters {
      info {
          count
      }
    }
    charactersByIds(ids: $ids) {
          name
          id
          image
          location {
            name
          }
    }
  }
`;

