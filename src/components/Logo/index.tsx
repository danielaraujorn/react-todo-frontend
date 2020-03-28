import React from 'react'
import * as Styled from './style'
import logo from '../../icons/olist.svg'
export const Logo = ({ big }: { big?: boolean }) => (
  <Styled.Container big={big}>
    <img src={logo} alt='Olist logo' />
  </Styled.Container>
)
