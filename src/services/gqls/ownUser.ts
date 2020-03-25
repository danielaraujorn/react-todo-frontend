import { gql } from 'apollo-boost'

export const OWN_USER_QUERY = gql`
  query ownUser {
    ownUser {
      firstName
      email
    }
  }
`
