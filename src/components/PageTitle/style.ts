import styled from 'styled-components'

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.text.color};
  margin: 0;
  text-shadow: 3px 3px 8px #0002;
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
