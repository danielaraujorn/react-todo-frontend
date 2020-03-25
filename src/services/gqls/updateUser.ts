import { gql } from 'apollo-boost'

export const UPDATE_USER__MUTATION = gql`
  mutation updateUser($firstName: String, $email: String, $password: String!) {
    updateUser(firstName: $firstName, email: $email, password: $password) {
      email
      firstName
    }
  }
`
