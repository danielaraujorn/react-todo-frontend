import { gql } from 'apollo-boost'

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id, deleted: true) {
      id
      text
      completed
      createdAt
      updatedAt
    }
  }
`
