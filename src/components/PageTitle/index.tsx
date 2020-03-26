import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './style'

type PageTitleProps = {
  text?: string
  left?: ReactNode
  className?: string
}

export const PageTitle: FunctionComponent<PageTitleProps> = ({
  left,
  text,
  className,
}) => (
  <Styled.Container className={className}>
    {left && <Styled.Left>{left}</Styled.Left>}
    <Styled.PageTitle>{text}</Styled.PageTitle>
  </Styled.Container>
)
