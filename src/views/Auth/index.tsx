import React, { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import ReactGA from 'react-ga'
import { loginTheme, registerTheme } from './theme'
import {
  PageTitle,
  Input,
  Button,
  BottomButtons,
  PasswordInput,
  VerticalSpace,
} from '../../components'
import { AuthContext } from '../../contexts/AuthContext'
import { LOGIN_MUTATION } from '../../gqls/login'
import { REGISTER_MUTATION } from '../../gqls/register'
import { useInternalTheme } from '../../hooks/useInternalTheme'
import { useFormatMessage } from '../../hooks/useFormatMessage'

const Auth = () => {
  const formatMessage = useFormatMessage()
  const registerMessage = formatMessage('register')
  const loginMessage = formatMessage('login')

  const [loginMode, setLoginMode] = useState(true)
  useInternalTheme(loginMode ? loginTheme : registerTheme)

  useEffect(() => ReactGA.pageview(loginMode ? 'login' : 'register'), [
    loginMode,
  ])

  const { logIn } = useContext(AuthContext)

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkAndLogin = ({
    success,
    token,
  }: {
    success: boolean
    token?: any
  }) => success && token && logIn(token)

  const [registerMutation] = useMutation(REGISTER_MUTATION, {
    variables: { email, password, firstName },
    onCompleted: ({ register }) => checkAndLogin(register),
  })
  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
    onCompleted: ({ login }) => checkAndLogin(login),
  })

  const onSubmit = (e: any) => {
    e.preventDefault()
    loginMode ? loginMutation() : registerMutation()
  }

  const toggleLoginState = () => setLoginMode(!loginMode)

  return (
    <form onSubmit={onSubmit}>
      <VerticalSpace>
        <PageTitle text={loginMode ? loginMessage : registerMessage} />
        {!loginMode && (
          <Input
            name='given-name'
            placeholder={formatMessage('firstName')}
            value={firstName}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setFirstName(value)
            }
          />
        )}
        <Input
          placeholder={formatMessage('email')}
          type='email'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <PasswordInput
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <BottomButtons>
          <Button
            fullWidth
            flat
            onClick={toggleLoginState}
            aria-label={loginMode ? registerMessage : loginMessage}
          >
            {loginMode ? registerMessage : loginMessage}
          </Button>
          <Button
            fullWidth
            type='submit'
            aria-label={loginMode ? loginMessage : registerMessage}
          >
            {loginMode ? loginMessage : registerMessage}
          </Button>
        </BottomButtons>
      </VerticalSpace>
    </form>
  )
}

export default Auth
