import { gql } from 'apollo-boost'

export const CREATE_LIST_MUTATION = gql`
  mutation upsertList($text: String!) {
    upsertList(listInput: { text: $text }) {
      id
      text
      createdAt
      updatedAt
    }
  }
`
