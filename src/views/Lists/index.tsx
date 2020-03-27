import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { FiCheck, FiUser } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { theme } from './theme'
import {
  PageTitle,
  Input,
  ItemCard,
  ItemsLoading,
  Container,
  IconButton,
  VerticalSpace,
} from '../../components'
import { LISTS_QUERY } from '../../gqls/lists'
import { CREATE_LIST_MUTATION } from '../../gqls/createList'
import { EDIT_LIST_MUTATION } from '../../gqls/editList'
import { DELETE_LIST_MUTATION } from '../../gqls/deleteList'
import { useInternalTheme } from '../../hooks/useInternalTheme'
import { useFormatMessage } from '../../hooks/useFormatMessage'

const Lists = () => {
  const formatMessage = useFormatMessage()

  useInternalTheme(theme)

  const history = useHistory()

  const [newListText, setNewListText] = useState('')

  const { data, error, loading } = useQuery(LISTS_QUERY)
  const [createList] = useMutation(CREATE_LIST_MUTATION, {
    variables: { text: newListText },
    refetchQueries: ['lists'],
  })

  const [editList] = useMutation(EDIT_LIST_MUTATION, {
    refetchQueries: ['lists'],
  })

  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    refetchQueries: ['lists'],
  })

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (newListText) {
      createList()
      setNewListText('')
    }
    return false
  }

  const listsList = useMemo(() => {
    if (loading) return <ItemsLoading />
    if (error || !data) return <div></div>
    const {
      lists = {},
    }: {
      lists: { items?: { id: string; text: string }[]; total?: number }
    } = data
    const { items = [] } = lists
    return items.map((item) => (
      <ItemCard
        key={item.id}
        onClick={({ id }: { id: string }) => history.push('/' + id)}
        onEdit={({ id, text, ...restList }: { id: string; text: string }) =>
          editList({
            variables: { id, text },
            optimisticResponse: { upsertList: { id, text, ...restList } },
          })
        }
        onDelete={({ id }: { id: string }) => deleteList({ variables: { id } })}
        item={item}
      />
    ))
  }, [data, deleteList, editList, error, history, loading])

  return (
    <Container>
      <VerticalSpace>
        <PageTitle
          text={formatMessage('lists')}
          left={
            <IconButton
              aria-label={formatMessage('profile')}
              onClick={() => history.push('/profile')}
            >
              <FiUser />
            </IconButton>
          }
        />
        <form onSubmit={onSubmit}>
          <Input
            disabled={!!loading || !!error}
            placeholder={formatMessage('newList')}
            value={newListText}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setNewListText(value)
            }
            right={
              <IconButton
                aria-label={formatMessage('createList')}
                disabled={!newListText}
                type='submit'
              >
                <FiCheck />
              </IconButton>
            }
          />
        </form>
        {listsList}
      </VerticalSpace>
    </Container>
  )
}

export default Lists
