import ApolloClient from 'apollo-boost'
import { getAuthToken, deleteAuthToken } from './utils/cookies'

const formatToken = () => {
  const token = getAuthToken()
  return token ? 'Bearer ' + token : ''
}

export const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  request: (operation) => {
    operation.setContext({
      headers: { Authorization: formatToken() },
    })
  },
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors?.some(({ message }) => message === 'Unauthorized')) {
      deleteAuthToken()
      window.location.reload()
    }
  },
})
