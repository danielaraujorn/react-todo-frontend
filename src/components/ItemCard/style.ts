import styled from 'styled-components'
import { Text as DefaultText } from '../Text'

export const TextContainer = styled.div<{
  clickable: boolean
  toLeft: boolean
}>`
  display: flex;
  align-items: center;
  ${({ clickable }) => clickable && 'cursor:pointer;'}
`

export const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 440px;
  padding: 10px 30px;
`

export const Icons = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`

export const Text = styled(DefaultText)<{ completed?: boolean }>`
  ${({ completed }) => completed && 'text-decoration:line-through;'}
`
