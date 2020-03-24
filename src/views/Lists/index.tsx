import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PageTitle } from '../../components/PageTitle'
import { FiCheck } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Link } from '../../components/Link'
import { ItemCard, ItemsLoading } from '../../components/ItemCard'
import { Container } from '../../components/Container'
import { IconButton } from '../../components/Button'
import { VerticalSpace } from '../../components/VerticalSpace'
import { InternalThemeContext } from '../../contexts/InternalThemeContext'
import { theme } from './theme'
import { LISTS_QUERY } from '../../services/gqls/lists'
import { CREATE_LIST_MUTATION } from '../../services/gqls/createList'
import { EDIT_LIST_MUTATION } from '../../services/gqls/editList'
import { DELETE_LIST_MUTATION } from '../../services/gqls/deleteList'

const Lists = () => {
  const { setTheme } = useContext(InternalThemeContext)
  useEffect(() => {
    setTheme(theme)
  })

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
      <Link key={item.id} to={'/' + item.id}>
        <ItemCard
          onEdit={({ id, text, ...restList }: { id: string; text: string }) =>
            editList({
              variables: { id, text },
              optimisticResponse: { upsertList: { id, text, ...restList } }
            })
          }
          onDelete={({ id }: { id: string }) =>
            deleteList({ variables: { id } })
          }
          item={item}
        />
      </Link>
    ))
  }, [data, deleteList, editList, error, loading])

  return (
    <Container>
      <VerticalSpace>
        <PageTitle>Listas</PageTitle>
        <form onSubmit={onSubmit}>
          <Input
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
