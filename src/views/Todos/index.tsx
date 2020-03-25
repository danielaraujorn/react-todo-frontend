import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PageTitle } from '../../components/PageTitle'
import { FiCheck, FiArrowLeft } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { ItemCard, ItemsLoading } from '../../components/ItemCard'
import { Container } from '../../components/Container'
import { IconButton } from '../../components/Button'
import { VerticalSpace } from '../../components/VerticalSpace'
import { theme } from './theme'
import { CREATE_TODO_MUTATION } from '../../services/gqls/createTodo'
import { EDIT_TODO_MUTATION } from '../../services/gqls/editTodo'
import { DELETE_TODO_MUTATION } from '../../services/gqls/deleteTodo'
import { LIST_QUERY } from '../../services/gqls/list'
import { useParams } from 'react-router-dom'
import { Link } from '../../components/Link'
import { useInternalTheme } from '../../hooks/useInternalTheme'

const Todos = () => {
  useInternalTheme(theme)

  const { listId } = useParams()

  const [newTodoText, setNewTodoText] = useState('')

  const { data, error, loading } = useQuery(LIST_QUERY, {
    variables: { id: listId }
  })

  const refetchQueries = ['list']

  const [createTodo] = useMutation(CREATE_TODO_MUTATION, {
    variables: { text: newTodoText, listId },
    refetchQueries
  })

  const [editTodo] = useMutation(EDIT_TODO_MUTATION, {
    refetchQueries
  })

  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    refetchQueries
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
    return data?.list?.todos.map((todo: { id: string; text: string }) => (
      <ItemCard
        key={todo.id}
        onEdit={({ id, text, ...restTodo }: { id: string; text: string }) =>
          editTodo({
            variables: { id, text, listId },
            optimisticResponse: { upsertTodo: { id, text, ...restTodo } }
          })
        }
        onDelete={({ id }: { id: string }) => deleteTodo({ variables: { id } })}
        item={todo}
      />
    ))
  }, [data, deleteTodo, editTodo, error, listId, loading])

  return (
    <Container>
      <VerticalSpace>
        <PageTitle
          text={data?.list?.text}
          left={
            <Link to='/'>
              <IconButton>
                <FiArrowLeft />
              </IconButton>
            </Link>
          }
        />
        <form onSubmit={onSubmit}>
          <Input
            disabled={!!loading || !!error}
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
