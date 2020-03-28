import React, { useState, useEffect, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import ReactGA from 'react-ga'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { theme } from './theme'
import {
  PageTitle,
  Input,
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
import { useFormatMessage } from '../../hooks/useFormatMessage'

const Profile = () => {
  const formatMessage = useFormatMessage()

  useEffect(() => {
    ReactGA.pageview('profile')
  })

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
    <form onSubmit={onSubmit}>
      <VerticalSpace>
        <PageTitle
          text={formatMessage('profile')}
          left={
            <IconButton
              aria-label={formatMessage('lists')}
              onClick={toHomePage}
            >
              <FiArrowLeft />
            </IconButton>
          }
        />
        <Input
          name='given-name'
          placeholder={formatMessage('firstName')}
          value={firstName}
          onChange={({ target: { value } }: { target: { value: string } }) =>
            setState({ firstName: value })
          }
        />
        <Input
          placeholder={formatMessage('email')}
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
            aria-label={formatMessage('cancel')}
          >
            {formatMessage('cancel')}
          </Button>
          <Button fullWidth type='submit' aria-label={formatMessage('save')}>
            {formatMessage('save')}
          </Button>
        </BottomButtons>
      </VerticalSpace>
    </form>
  )
}

export default Profile
