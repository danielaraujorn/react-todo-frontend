import { gql } from 'apollo-boost'

export const DELETE_LIST_MUTATION = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id, deleted: true) {
      id
      text
      createdAt
      updatedAt
    }
  }
`
