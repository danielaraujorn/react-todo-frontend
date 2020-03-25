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
  onClick?: Function
}

export const ItemsLoading = ({ total = 4 }: { total?: number }) => {
  const array = new Array(total).fill({})
  return (
    <>
      {array.map((_, index) => (
        <Styled.LoadingBox key={index} index={index} total={total} />
      ))}
    </>
  )
}

export const ItemCard: FunctionComponent<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onClick
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
                <IconButton
                  onClick={e => {
                    setEditMode(true)
                  }}
                >
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
          <Styled.TextContainer
            onClick={() => onClick && onClick(item)}
            clickable={!!onClick}
          >
            <Text>{text}</Text>
          </Styled.TextContainer>
        )}
      </Box>
    </form>
  )
}
