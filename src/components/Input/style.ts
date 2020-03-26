import styled from 'styled-components'
import { Side } from '../Box/style'

export const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text.color};
  font-size: 16px;
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder.color};
  }
  &:placeholder-shown ~ ${Side} {
    opacity: 0.4;
  }
  &:-webkit-autofill,
  &:-internal-autofill-selected {
    background: none !important;
    background-color: transparent !important;
  }
`
