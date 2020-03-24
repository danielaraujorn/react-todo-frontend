import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PageTitle } from '../../components/PageTitle'
import { FiCheck } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { ItemCard, ItemsLoading } from '../../components/ItemCard'
import { Container } from '../../components/Container'
import { IconButton } from '../../components/Button'
import { VerticalSpace } from '../../components/VerticalSpace'
import { InternalThemeContext } from '../../contexts/InternalThemeContext'
import { theme } from './theme'
import { TODOS_QUERY } from '../../services/gqls/todos'
import { CREATE_TODO_MUTATION } from '../../services/gqls/createTodo'
import { EDIT_TODO_MUTATION } from '../../services/gqls/editTodo'
import { DELETE_TODO_MUTATION } from '../../services/gqls/deleteTodo'
import { useParams } from 'react-router-dom'

const Todos = () => {
  const { setTheme } = useContext(InternalThemeContext)
  useEffect(() => {
    setTheme(theme)
  })

  const { listId } = useParams()

  const [newTodoText, setNewTodoText] = useState('')

  const { data, error, loading } = useQuery(TODOS_QUERY)
  const [createTodo] = useMutation(CREATE_TODO_MUTATION, {
    variables: { text: newTodoText, listId },
    refetchQueries: ['todos']
  })

  const [editTodo] = useMutation(EDIT_TODO_MUTATION, {
    refetchQueries: ['todos']
  })

  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    refetchQueries: ['todos']
  })

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (newTodoText) {
      createTodo()
      setNewTodoText('')
    }
    return false
  }

  const todosList = useMemo(() => {
    if (loading) return <ItemsLoading />
    if (error || !data) return <div></div>
    const {
      todos = {}
    }: {
      todos: { items?: Array<{ id: string; text: string }>; total?: number }
    } = data
    const { items = [] } = todos
    return items.map(item => (
      <ItemCard
        key={item.id}
        onEdit={({ id, text, ...restTodo }: { id: string; text: string }) =>
          editTodo({
            variables: { id, text, listId },
            optimisticResponse: { upsertTodo: { id, text, ...restTodo } }
          })
        }
        onDelete={({ id }: { id: string }) => deleteTodo({ variables: { id } })}
        item={item}
      />
    ))
  }, [data, deleteTodo, editTodo, error, listId, loading])

  return (
    <Container>
      <VerticalSpace>
        <PageTitle>Itens</PageTitle>
        <form onSubmit={onSubmit}>
          <Input
            placeholder='Novo item'
            value={newTodoText}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setNewTodoText(value)
            }
            right={
              <IconButton disabled={!newTodoText} type='submit'>
                <FiCheck />
              </IconButton>
            }
          />
        </form>
        {todosList}
      </VerticalSpace>
    </Container>
  )
}

export default Todos
