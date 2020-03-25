import styled from 'styled-components'
import { themeInterface } from '../../theme'

export const Container = styled.div<{ theme: themeInterface }>`
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
