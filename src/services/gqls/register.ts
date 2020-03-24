import { gql } from 'apollo-boost'

export const REGISTER_MUTATION = gql`
  mutation register($firstName: String!, $email: String!, $password: String!) {
    register(firstName: $firstName, email: $email, password: $password) {
      success
      token {
        accessToken
      }
    }
  }
`
