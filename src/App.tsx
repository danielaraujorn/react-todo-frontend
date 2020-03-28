import React, { useState, useCallback } from 'react'
import { ThemeProvider, ThemeConsumer } from 'styled-components'
import { IconContext } from 'react-icons'
import { IntlProvider } from 'react-intl'
import { useApolloClient } from '@apollo/react-hooks'
import { messages } from './messages'
import { Root } from './components'
import { Navigation } from './Navigation'
import { theme, themeType } from './theme'
import { InternalThemeContext } from './contexts/InternalThemeContext'
import { AuthContext } from './contexts/AuthContext'
import { setAuthToken, deleteAuthToken, getAuthToken } from './utils/cookies'

const App = () => {
  const client = useApolloClient()

  const [logged, setLogged]: [boolean, any] = useState(!!getAuthToken())

  const [themeSelected, setTheme]: [themeType, any] = useState(theme)

  const logIn = useCallback(
    (token: { accessToken: string; expiresIn: number }) => {
      const { accessToken, expiresIn } = token
      setAuthToken(accessToken, expiresIn)
      setLogged(true)
      client.resetStore()
    },
    [client],
  )

  const logOut = useCallback(() => {
    deleteAuthToken()
    setLogged(false)
    client.resetStore()
  }, [client])

  const language = navigator.language.split(/[-_]/)[0]
  const selectedMessages = messages[language] || messages.en

  return (
    <AuthContext.Provider value={{ logged, logIn, logOut }}>
      <InternalThemeContext.Provider
        value={{
          theme: themeSelected,
          setTheme: (newTheme) => {
            const metaThemeColor = document.querySelector(
              'meta[name=theme-color]',
            )
            metaThemeColor?.setAttribute('content', newTheme.primary.main)
            setTheme(newTheme)
          },
        }}
      >
        <ThemeProvider theme={themeSelected}>
          <ThemeConsumer>
            {({ icon }) => (
              <IconContext.Provider
                value={{ color: icon.color, size: '1.2em' }}
              >
                <IntlProvider
                  locale={navigator.language}
                  messages={selectedMessages}
                >
                  <Root theme={themeSelected}>
                    <Navigation />
                  </Root>
                </IntlProvider>
              </IconContext.Provider>
            )}
          </ThemeConsumer>
        </ThemeProvider>
      </InternalThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
