import { gql } from 'apollo-boost'

export const TODOS_QUERY = gql`
  query todos($listId: ID) {
    todos(listId: $listId) {
      total
      items {
        id
        text
        completed
        createdAt
        updatedAt
      }
    }
  }
`
