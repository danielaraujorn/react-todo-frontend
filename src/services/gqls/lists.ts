import { gql } from 'apollo-boost'

export const LISTS_QUERY = gql`
  query lists {
    lists {
      total
      items {
        id
        text
        createdAt
        updatedAt
      }
    }
  }
`
