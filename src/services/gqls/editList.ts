import { gql } from 'apollo-boost'

export const EDIT_LIST_MUTATION = gql`
  mutation upsertList($id: ID!, $text: String!) {
    upsertList(id: $id, listInput: { text: $text }) {
      id
      text
      createdAt
      updatedAt
    }
  }
`
