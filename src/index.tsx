import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './apollo'
import * as serviceWorker from './serviceWorker'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV === 'development') serviceWorker.unregister()
else serviceWorker.register()
