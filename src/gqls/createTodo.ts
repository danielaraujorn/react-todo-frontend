import { gql } from 'apollo-boost'

export const CREATE_TODO_MUTATION = gql`
  mutation upsertTodo($text: String!, $listId: ID!) {
    upsertTodo(todoInput: { text: $text, listId: $listId }) {
      id
      text
      completed
      createdAt
      updatedAt
    }
  }
`
