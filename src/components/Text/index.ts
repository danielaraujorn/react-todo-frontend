import styled from 'styled-components'

export const Text = styled.p`
  color: ${({ theme }) => theme.text.color};
  margin: 0;
  &::selection {
    color: ${({ theme }) => theme.primary.main};
    background-color: ${({ theme }) => theme.text.color};
  }
`
