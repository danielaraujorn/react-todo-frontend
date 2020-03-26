import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './style'

type ContainerProps = {
  children: ReactNode
  className?: string
  center?: boolean
}

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  className,
  center = false,
}) => (
  <Styled.Container center={center} className={className}>
    <Styled.Content>{children}</Styled.Content>
  </Styled.Container>
)
