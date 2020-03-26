import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loginTheme, registerTheme } from './theme'
import {
  PageTitle,
  Input,
  Container,
  Button,
  BottomButtons,
  PasswordInput,
  VerticalSpace,
} from '../../components'
import { AuthContext } from '../../contexts/AuthContext'
import { LOGIN_MUTATION } from '../../gqls/login'
import { REGISTER_MUTATION } from '../../gqls/register'
import { useInternalTheme } from '../../hooks/useInternalTheme'

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true)
  useInternalTheme(loginMode ? loginTheme : registerTheme)

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
    <Container center>
      <form onSubmit={onSubmit}>
        <VerticalSpace>
          <PageTitle text={loginMode ? 'Login' : 'Registrar'} />
          {!loginMode && (
            <Input
              name='given-name'
              placeholder='Primeiro nome'
              value={firstName}
              onChange={({
                target: { value },
              }: {
                target: { value: string }
              }) => setFirstName(value)}
            />
          )}
          <Input
            placeholder='Email'
            type='email'
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <PasswordInput
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <BottomButtons>
            <Button fullWidth flat onClick={toggleLoginState}>
              {loginMode ? 'Registrar' : 'Entrar'}
            </Button>
            <Button fullWidth type='submit'>
              {loginMode ? 'Entrar' : 'Registrar'}
            </Button>
          </BottomButtons>
        </VerticalSpace>
      </form>
    </Container>
  )
}

export default Auth
