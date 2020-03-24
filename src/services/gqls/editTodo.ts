import { gql } from 'apollo-boost'

export const EDIT_TODO_MUTATION = gql`
  mutation upsertTodo(
    $id: ID!
    $text: String!
    $listId: ID!
    $completed: Boolean
  ) {
    upsertTodo(
      id: $id
      todoInput: { text: $text, listId: $listId, completed: $completed }
    ) {
      id
      text
      completed
      createdAt
      updatedAt
    }
  }
`
