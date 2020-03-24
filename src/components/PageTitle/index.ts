import styled from 'styled-components'

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.text.color};
  margin: 0;
  text-shadow: 3px 3px 8px #0002;
  &::selection {
    color: ${({ theme }) => theme.primary.main};
    background-color: ${({ theme }) => theme.text.color};
    text-shadow: none;
  }
`
