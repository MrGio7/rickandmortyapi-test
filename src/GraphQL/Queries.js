import { gql } from "@apollo/client";

export const LOAD_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
      }
    }
  }
`;

export const SEARCH_CHARACTERS = gql`
  query SearchCharacter($searchRequest: String) {
    characters(filter: { name: $searchRequest }) {
      results {
        id
        name
      }
    }
  }
`;

export const LOAD_CHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      species
      gender
      location {
        name
      }
      episode {
        episode
      }
      status
      created
      image
    }
  }
`;

export const LOAD_LIKED = gql`
  query getLiket($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
    }
  }
`