import styled from 'styled-components'

export const Container = styled.div<{ big?: boolean }>`
  height: ${({ big }) => (big ? 40 : 25)}px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
`
