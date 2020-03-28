import React, { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import ReactGA from 'react-ga'
import { FiCheck, FiArrowLeft } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import * as Styled from './style'
import { theme } from './theme'
import {
  PageTitle,
  Input,
  ItemCard,
  ItemsLoading,
  IconButton,
  VerticalSpace,
  Link,
} from '../../components'
import { CREATE_TODO_MUTATION } from '../../gqls/createTodo'
import { EDIT_TODO_MUTATION } from '../../gqls/editTodo'
import { DELETE_TODO_MUTATION } from '../../gqls/deleteTodo'
import { LIST_QUERY } from '../../gqls/list'
import { TODOS_QUERY } from '../../gqls/todos'
import { useInternalTheme } from '../../hooks/useInternalTheme'
import { useFormatMessage } from '../../hooks/useFormatMessage'

const Todos = () => {
  const formatMessage = useFormatMessage()

  useEffect(() => {
    ReactGA.pageview('todos')
  })

  useInternalTheme(theme)

  const { listId } = useParams()

  const [newTodoText, setNewTodoText] = useState('')

  const { data: listData } = useQuery(LIST_QUERY, {
    variables: { id: listId },
  })

  const { data: todosData, loading: todosLoading } = useQuery(TODOS_QUERY, {
    variables: { listId },
  })

  const refetchQueries = ['todos']

  const [createTodo] = useMutation(CREATE_TODO_MUTATION, {
    variables: { text: newTodoText, listId },
    refetchQueries,
  })

  const [editTodo] = useMutation(EDIT_TODO_MUTATION, {
    refetchQueries,
  })

  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    refetchQueries,
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
    if (todosLoading || !todosData) return <ItemsLoading />
    return todosData?.todos?.items?.map(
      (item: { id: string; text: string; completed: boolean }) => {
        const { id, text, completed } = item
        return (
          <ItemCard
            completed={completed}
            left={({ editMode }) => (
              <IconButton
                aria-label={formatMessage('toggleTodo')}
                flat
                disabled={editMode}
                onClick={() =>
                  editTodo({
                    variables: { id, text, listId, completed: !completed },
                    optimisticResponse: { ...item, completed: !completed },
                  })
                }
              >
                <Styled.Circle completed={completed} />
              </IconButton>
            )}
            key={id}
            onEdit={(todo: { text: string }) =>
              editTodo({
                variables: { text: todo.text, listId },
                optimisticResponse: { upsertTodo: todo },
              })
            }
            onDelete={() => deleteTodo({ variables: { id } })}
            item={item}
          />
        )
      },
    )
  }, [todosLoading, todosData, formatMessage, editTodo, listId, deleteTodo])

  return (
    <VerticalSpace>
      <PageTitle
        text={listData?.list?.text}
        left={
          <Link to='/'>
            <IconButton aria-label={formatMessage('lists')}>
              <FiArrowLeft />
            </IconButton>
          </Link>
        }
      />
      <form onSubmit={onSubmit}>
        <Input
          disabled={!!todosLoading || !todosData}
          placeholder={formatMessage('newTodo')}
          value={newTodoText}
          onChange={({ target: { value } }: { target: { value: string } }) =>
            setNewTodoText(value)
          }
          right={
            <IconButton
              aria-label={formatMessage('createTodo')}
              disabled={!newTodoText}
              type='submit'
            >
              <FiCheck />
            </IconButton>
          }
        />
      </form>
      {todosList}
    </VerticalSpace>
  )
}

export default Todos
