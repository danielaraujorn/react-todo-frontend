import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './style'

type BoxProps = {
  children?: ReactNode
  left?: ReactNode
  right?: ReactNode
  variant?: Styled.variantType
  className?: string
}

export const Box: FunctionComponent<BoxProps> = ({
  left,
  right,
  variant = 'convex',
  children,
  className
}) => {
  return (
    <Styled.Container className={className} variant={variant}>
      {left && <Styled.Left>{left}</Styled.Left>}
      {children}
      {right && <Styled.Right>{right}</Styled.Right>}
    </Styled.Container>
  )
}