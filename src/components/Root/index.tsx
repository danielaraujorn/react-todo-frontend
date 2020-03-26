import React, { FunctionComponent, ReactNode } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import * as Styled from './style'
import { themeType } from '../../theme'

type RootProps = {
  children?: ReactNode
  theme: themeType
}

export const Root: FunctionComponent<RootProps> = ({ children, theme }) => {
  const size = useWindowSize()
  return (
    <Styled.Container style={{ minHeight: size.height }} theme={theme}>
      {children}
    </Styled.Container>
  )
}
