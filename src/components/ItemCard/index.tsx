import React, { FunctionComponent, useState } from 'react'
import { FiEdit2, FiTrash, FiCheck, FiX } from 'react-icons/fi'
import * as Styled from './style'
import { Text } from '../Text'
import { IconButton } from '../Button'
import { Box } from '../Box'
import { Input } from '../Input/style'

type itemType = {
  text: string
}

type ItemCardProps = {
  item: itemType
  onEdit: Function
  onDelete: Function
}

export const ItemsLoading = () => {
  return (
    <>
      {[0, 1, 2, 3].map(num => (
        <Styled.LoadingBox key={num} index={num} />
      ))}
    </>
  )
}

export const ItemCard: FunctionComponent<ItemCardProps> = ({
  item,
  onEdit,
  onDelete
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
        variant={editMode ? 'concave' : 'convex'}
        right={
          <Styled.Icons>
            {editMode ? (
              <>
                <IconButton
                  onClick={() => {
                    setNewText(text)
                    setEditMode(false)
                  }}
                >
                  <FiX />
                </IconButton>
                <IconButton type='submit'>
                  <FiCheck />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => setEditMode(true)}>
                  <FiEdit2 />
                </IconButton>
                <IconButton onClick={() => onDelete(item)}>
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
          <Styled.TextContainer>
            <Text>{text}</Text>
          </Styled.TextContainer>
        )}
      </Box>
    </form>
  )
}
