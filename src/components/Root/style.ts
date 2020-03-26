import styled from 'styled-components'
import { themeType } from '../../theme'

export const Container = styled.div<{ theme: themeType }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary.main};
  transition-duration: 150ms;
  *::selection {
    color: ${({ theme }) => theme.primary.main};
    background-color: ${({ theme }) => theme.text.color};
  }
`
