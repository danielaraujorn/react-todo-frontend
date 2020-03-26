import styled from 'styled-components'

export const Circle = styled.div<{ completed: boolean }>`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin: auto;
  border: 2px solid ${({ theme }) => theme.text.color};
  background-color: ${({ completed, theme }) => completed && theme.text.color};
`
