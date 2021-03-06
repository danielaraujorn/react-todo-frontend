import { gql } from 'apollo-boost'

export const LIST_QUERY = gql`
  query list($id: ID!) {
    list(id: $id) {
      id
      text
    }
  }
`
