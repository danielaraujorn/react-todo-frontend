import styled from 'styled-components'

export const Button = styled.button.attrs(({ type }) => ({
  type: type || 'button'
}))<{
  fullWidth?: boolean
  outlined?: boolean
  theme: Object
}>`
  width: ${({ fullWidth = false }) => (fullWidth ? '100%' : 'initial')};
  border: ${({ outlined = false, theme }) =>
    outlined ? '1px solid ' + theme.text.color : 'none'};
  text-transform: uppercase;
  text-shadow: 2px 2px 5px #0002;
  background: no-repeat;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 16px;
  border-radius: 30px;
  transition-duration: 200ms;
  opacity: 0.8;
  box-shadow: 4px 4px 10px inset #fff1, -4px -4px 10px inset #0001;
  color: ${({ theme }) => theme.text.color};
  &:hover,
  &:focus {
    box-shadow: 4px 4px 10px inset #0001, -4px -4px 10px inset #fff1;
    transition-duration: 200ms;
    opacity: 1;
  }
  &:active {
    box-shadow: 4px 4px 10px inset #0002, -4px -4px 10px inset #fff1;
    transition-duration: 200ms;
    opacity: 1;
  }
`

export const IconButton = styled(Button)`
  padding: 8px;
`

export const BottomButtons = styled.div`
  display: flex;
  & > ${Button}:not(:last-child) {
    margin-right: 25px;
  }
`
