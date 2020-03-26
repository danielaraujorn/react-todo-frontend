import React, { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { FiCheck, FiArrowLeft } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import * as Styled from './style'
import { theme } from './theme'
import {
  PageTitle,
  Input,
  ItemCard,
  ItemsLoading,
  Container,
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

const Todos = () => {
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
        const { id, completed } = item
        return (
          <ItemCard
            completed={completed}
            left={
              <IconButton
                flat
                onClick={() =>
                  editTodo({
                    variables: { ...item, listId, completed: !completed },
                    optimisticResponse: { ...item, completed: !completed },
                  })
                }
              >
                <Styled.Circle completed={completed} />
              </IconButton>
            }
            key={id}
            onEdit={(todo: { id: string; text: string }) =>
              editTodo({
                variables: { ...todo, listId },
                optimisticResponse: { upsertTodo: todo },
              })
            }
            onDelete={(todo: { id: string }) => deleteTodo({ variables: todo })}
            item={item}
          />
        )
      },
    )
  }, [todosLoading, todosData, editTodo, listId, deleteTodo])

  return (
    <Container>
      <VerticalSpace>
        <PageTitle
          text={listData?.list?.text || 'Carregando...'}
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
            disabled={!!todosLoading || !todosData}
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
