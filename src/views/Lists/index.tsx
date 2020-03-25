import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PageTitle } from '../../components/PageTitle'
import { FiCheck, FiUser } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { ItemCard, ItemsLoading } from '../../components/ItemCard'
import { Container } from '../../components/Container'
import { IconButton } from '../../components/Button'
import { VerticalSpace } from '../../components/VerticalSpace'
import { theme } from './theme'
import { LISTS_QUERY } from '../../services/gqls/lists'
import { CREATE_LIST_MUTATION } from '../../services/gqls/createList'
import { EDIT_LIST_MUTATION } from '../../services/gqls/editList'
import { DELETE_LIST_MUTATION } from '../../services/gqls/deleteList'
import { useHistory } from 'react-router-dom'
import { useInternalTheme } from '../../hooks/useInternalTheme'

const Lists = () => {
  useInternalTheme(theme)

  const history = useHistory()

  const [newListText, setNewListText] = useState('')

  const { data, error, loading } = useQuery(LISTS_QUERY)
  const [createList] = useMutation(CREATE_LIST_MUTATION, {
    variables: { text: newListText },
    refetchQueries: ['lists']
  })

  const [editList] = useMutation(EDIT_LIST_MUTATION, {
    refetchQueries: ['lists']
  })

  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    refetchQueries: ['lists']
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
      lists = {}
    }: {
      lists: { items?: Array<{ id: string; text: string }>; total?: number }
    } = data
    const { items = [] } = lists
    return items.map(item => (
      <ItemCard
        key={item.id}
        onClick={({ id }: { id: string }) => history.push('/' + id)}
        onEdit={({ id, text, ...restList }: { id: string; text: string }) =>
          editList({
            variables: { id, text },
            optimisticResponse: { upsertList: { id, text, ...restList } }
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
          text='Listas'
          left={
            <IconButton disabled>
              <FiUser />
            </IconButton>
          }
        />
        <form onSubmit={onSubmit}>
          <Input
            disabled={!!loading || !!error}
            placeholder='Nova lista'
            value={newListText}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setNewListText(value)
            }
            right={
              <IconButton disabled={!newListText} type='submit'>
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
