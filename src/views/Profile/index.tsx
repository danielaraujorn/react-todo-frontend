import React, { useState, useEffect, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useIntl } from 'react-intl'
import { theme } from './theme'
import {
  PageTitle,
  Input,
  Container,
  Button,
  BottomButtons,
  IconButton,
  PasswordInput,
  VerticalSpace,
  ItemsLoading,
} from '../../components'
import { useInternalTheme } from '../../hooks/useInternalTheme'
import { OWN_USER_QUERY } from '../../gqls/ownUser'
import { UPDATE_USER__MUTATION } from '../../gqls/updateUser'

const Profile = () => {
  const { formatMessage } = useIntl()

  useInternalTheme(theme)

  const history = useHistory()
  const toHomePage = () => history.push('/')

  const { data, loading, error } = useQuery(OWN_USER_QUERY)

  const [defaultDataConfigured, setDefaultDataConfigured] = useState(false)

  const [state, setStateItem] = useState({
    firstName: 'a',
    email: 'c',
    password: '',
  })
  const setState = useCallback(
    (item: object) => setStateItem({ ...state, ...item }),
    [state, setStateItem],
  )

  useEffect(() => {
    if (!loading && !error && data && !defaultDataConfigured) {
      setDefaultDataConfigured(true)
      setState(data.ownUser)
    }
  }, [loading, data, error, defaultDataConfigured, setState])

  const { firstName, email, password } = state

  const [updateUserMutation] = useMutation(UPDATE_USER__MUTATION, {
    variables: { firstName, email, password },
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
            text={formatMessage({ id: 'profile' })}
            left={
              <IconButton
                aria-label={formatMessage({ id: 'lists' })}
                onClick={toHomePage}
              >
                <FiArrowLeft />
              </IconButton>
            }
          />
          <Input
            name='given-name'
            placeholder={formatMessage({ id: 'firstName' })}
            value={firstName}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setState({ firstName: value })
            }
          />
          <Input
            placeholder={formatMessage({ id: 'email' })}
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
            <Button
              fullWidth
              flat
              onClick={toHomePage}
              aria-label={formatMessage({ id: 'cancel' })}
            >
              {formatMessage({ id: 'cancel' })}
            </Button>
            <Button
              fullWidth
              type='submit'
              aria-label={formatMessage({ id: 'save' })}
            >
              {formatMessage({ id: 'save' })}
            </Button>
          </BottomButtons>
        </VerticalSpace>
      </form>
    </Container>
  )
}

export default Profile
