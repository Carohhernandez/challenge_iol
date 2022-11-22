import gql from 'graphql-tag';

export const FETCH_CHARACTER = gql`
    query CharacterQuery($id: ID!) {
        character(id: $id) {
            id
            image
            name
            status
            species
            location {
                name
            }
            origin {
                name
            }
        }
    }
`;