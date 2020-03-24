import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 440px;
  padding: 25px 30px;
  ${({ center }: { center: boolean }) => center && 'align-items: center'};
  display: flex;
`

export const Content = styled.div`
  width: 100%;
`
