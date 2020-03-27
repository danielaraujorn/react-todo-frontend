import React, { FunctionComponent, useState, ReactNode } from 'react'
import { FiEdit2, FiTrash, FiCheck, FiX } from 'react-icons/fi'
import * as Styled from './style'
import { IconButton } from '../Button'
import { Box } from '../Box'
import { Input } from '../Input/style'

type itemType = {
  id: string
  text: string
}

type ItemCardProps = {
  left?: ({ editMode }: { editMode: boolean }) => ReactNode
  item: itemType
  onEdit: (item: itemType) => void
  onDelete: (item: itemType) => void
  onClick?: (item: itemType) => void
  completed?: boolean
}

export const ItemCard: FunctionComponent<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onClick,
  left,
  completed,
}) => {
  const [editMode, setEditMode] = useState(false)
  const { text } = item
  const [newText, setNewText] = useState(text)
  const onSubmit = (e: any) => {
    e.preventDefault()
    if (editMode) {
      setNewText(newText)
      onEdit({ ...item, text: newText })
      setEditMode(false)
    }
    return false
  }
  return (
    <form onSubmit={onSubmit}>
      <Box
        left={left && left({ editMode })}
        variant={editMode ? 'concave' : 'convex'}
        right={
          <Styled.Icons>
            {editMode ? (
              <>
                <IconButton
                  aria-label='Sair da edição'
                  onClick={() => {
                    setNewText(text)
                    setEditMode(false)
                  }}
                >
                  <FiX />
                </IconButton>
                <IconButton aria-label='Salvar' type='submit'>
                  <FiCheck />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label='Edição'
                  onClick={(e) => {
                    setEditMode(true)
                  }}
                >
                  <FiEdit2 />
                </IconButton>
                <IconButton aria-label='Excluir' onClick={() => onDelete(item)}>
                  <FiTrash />
                </IconButton>
              </>
            )}
          </Styled.Icons>
        }
      >
        {editMode ? (
          <Input
            autoFocus
            value={newText}
            onChange={({ target: { value } }: { target: { value: string } }) =>
              setNewText(value)
            }
          />
        ) : (
          <Styled.TextContainer
            toLeft={!!left}
            onClick={() => onClick && onClick(item)}
            clickable={!!onClick}
          >
            <Styled.Text completed={completed}>{text}</Styled.Text>
          </Styled.TextContainer>
        )}
      </Box>
    </form>
  )
}
