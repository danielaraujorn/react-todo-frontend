import React, { useState, useCallback } from 'react'
import { ThemeProvider, ThemeConsumer } from 'styled-components'
import { IconContext } from 'react-icons'
import { Root } from './components/Root'
import { Navigation } from './Navigation'
import { theme, themeInterface } from './theme'
import { InternalThemeContext } from './contexts/InternalThemeContext'
import { AuthContext } from './contexts/AuthContext'
import { setAuthToken, deleteAuthToken, getAuthToken } from './utils/cookies'
import { useApolloClient } from '@apollo/react-hooks'

const App = () => {
  const client = useApolloClient()

  const [logged, setLogged]: [boolean, any] = useState(!!getAuthToken())

  const [themeSelected, setTheme]: [themeInterface, any] = useState(theme)

  const logIn = useCallback(
    (token: { accessToken: string; expiresIn: number }) => {
      const { accessToken, expiresIn } = token
      setAuthToken(accessToken, expiresIn)
      setLogged(true)
      client.resetStore()
    },
    [client]
  )

  const logOut = useCallback((): any => {
    deleteAuthToken()
    setLogged(false)
    client.resetStore()
  }, [client])

  return (
    <AuthContext.Provider value={{ logged, logIn, logOut }}>
      <InternalThemeContext.Provider
        value={{
          theme: themeSelected,
          setTheme: theme => {
            const metaThemeColor = document.querySelector(
              'meta[name=theme-color]'
            )
            metaThemeColor &&
              metaThemeColor.setAttribute('content', theme.primary.main)
            setTheme(theme)
          }
        }}
      >
        <ThemeProvider theme={themeSelected}>
          <ThemeConsumer>
            {({ icon }) => {
              return (
                <IconContext.Provider
                  value={{ color: icon.color, size: '1.2em' }}
                >
                  <Root theme={themeSelected}>
                    <Navigation />
                  </Root>
                </IconContext.Provider>
              )
            }}
          </ThemeConsumer>
        </ThemeProvider>
      </InternalThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
