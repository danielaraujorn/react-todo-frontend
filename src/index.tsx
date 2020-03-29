import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './apollo'
import * as serviceWorker from './serviceWorker'
import App from './App'
import ReactGA from 'react-ga'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV === 'development') serviceWorker.unregister()
else {
  // fetch to wake up the server
  fetch(String(process.env.REACT_APP_SERVER_URL), {
    mode: 'no-cors',
  })
  ReactGA.initialize('UA-102773432-3')
  serviceWorker.register()
}
