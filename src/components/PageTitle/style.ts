import styled from 'styled-components'

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.primary.dark};
  margin: 0;
  transition-duration: 150ms;
`
export const Left = styled.div`
  height: fit-content;
  margin: auto 0;
  margin-right: 8px;
`
export const Container = styled.div`
  display: flex;
  height: 37px;
`
