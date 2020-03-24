import React, { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { PageTitle } from '../../components/PageTitle'
import { Input } from '../../components/Input'
import { Container } from '../../components/Container'
import { Button, BottomButtons } from '../../components/Button'
import { PasswordInput } from '../../components/PasswordInput'
import { VerticalSpace } from '../../components/VerticalSpace'
import { REGISTER_MUTATION } from '../../services/gqls/register'
import { InternalThemeContext } from '../../contexts/InternalThemeContext'
import { AuthContext } from '../../contexts/AuthContext'
import { loginTheme, registerTheme } from './theme'
import { LOGIN_MUTATION } from '../../services/gqls/login'

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true)
  const { setTheme } = useContext(InternalThemeContext)
  const { logIn } = useContext(AuthContext)
  useEffect(() => {
    setTheme(loginMode ? loginTheme : registerTheme)
  }, [loginMode, setTheme])
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkAndLogin = ({
    success,
    token
  }: {
    success: boolean
    token?: any
  }) => success && token && logIn(token)

  const [registerMutation] = useMutation(REGISTER_MUTATION, {
    variables: { email, password, firstName },
    onCompleted: ({ register }) => checkAndLogin(register)
  })
  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
    onCompleted: ({ login }) => checkAndLogin(login)
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
          <PageTitle>{loginMode ? 'Login' : 'Registrar'}</PageTitle>
          {!loginMode && (
            <Input
              name='given-name'
              placeholder='Primeiro nome'
              value={firstName}
              onChange={({
                target: { value }
              }: {
                target: { value: string }
              }) => setFirstName(value)}
            />
          )}
          <Input
            placeholder='Email'
            type='email'
            value={email}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setEmail(value)
            }
          />
          <PasswordInput
            value={password}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setPassword(value)
            }
          />
          <BottomButtons>
            <Button fullWidth onClick={toggleLoginState}>
              {loginMode ? 'Registrar' : 'Entrar'}
            </Button>
            <Button fullWidth outlined type='submit'>
              {loginMode ? 'Entrar' : 'Registrar'}
            </Button>
          </BottomButtons>
        </VerticalSpace>
      </form>
    </Container>
  )
}

export default Auth
