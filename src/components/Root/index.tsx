import React, { FunctionComponent, ReactNode } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import * as Styled from './style'
import { themeInterface } from '../../theme'

type RootProps = {
  children?: ReactNode
  theme: themeInterface
}

export const Root: FunctionComponent<RootProps> = ({ children, theme }) => {
  const size = useWindowSize()
  return (
    <Styled.Container style={{ minHeight: size.height }} theme={theme}>
      {children}
    </Styled.Container>
  )
}
