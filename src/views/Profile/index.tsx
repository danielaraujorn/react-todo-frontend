import React, { useState, useEffect, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { theme } from './theme'
import { PageTitle } from '../../components/PageTitle'
import { Input } from '../../components/Input'
import { Container } from '../../components/Container'
import { Button, BottomButtons, IconButton } from '../../components/Button'
import { PasswordInput } from '../../components/PasswordInput'
import { VerticalSpace } from '../../components/VerticalSpace'
import { useInternalTheme } from '../../hooks/useInternalTheme'
import { OWN_USER_QUERY } from '../../services/gqls/ownUser'
import { ItemsLoading } from '../../components/ItemCard'
import { UPDATE_USER__MUTATION } from '../../services/gqls/updateUser'

const Profile = () => {
  useInternalTheme(theme)

  const { data, loading, error } = useQuery(OWN_USER_QUERY)

  const [defaultDataConfigured, setDefaultDataConfigured] = useState(false)

  const [state, setStateItem] = useState({
    firstName: 'a',
    email: 'c',
    password: ''
  })
  const setState = useCallback(
    (item: object) => setStateItem({ ...state, ...item }),
    [state, setStateItem]
  )

  useEffect(() => {
    if (!loading && !error && data && !defaultDataConfigured) {
      setDefaultDataConfigured(true)
      setState(data.ownUser)
    }
  }, [loading, data, error, defaultDataConfigured, setState])

  const { firstName, email, password } = state

  const [updateUserMutation] = useMutation(UPDATE_USER__MUTATION, {
    variables: { firstName, email, password }
  })

  if (loading || !data) return <ItemsLoading />

  const onSubmit = (e: any) => {
    e.preventDefault()
    updateUserMutation()
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <VerticalSpace>
          <PageTitle
            text='Perfil'
            left={
              <Link to='/'>
                <IconButton>
                  <FiArrowLeft />
                </IconButton>
              </Link>
            }
          />
          <Input
            name='given-name'
            placeholder='Primeiro nome'
            value={firstName}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setState({ firstName: value })
            }
          />
          <Input
            placeholder='Email'
            type='email'
            value={email}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setState({ email: value })
            }
          />
          <PasswordInput
            value={password}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setState({ password: value })
            }
          />
          <BottomButtons>
            <Button fullWidth flat>
              Cancelar
            </Button>
            <Button fullWidth type='submit'>
              Salvar
            </Button>
          </BottomButtons>
        </VerticalSpace>
      </form>
    </Container>
  )
}

export default Profile
