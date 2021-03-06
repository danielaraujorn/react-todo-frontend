import styled from 'styled-components'

export const Button = styled.button.attrs(({ type }) => ({
  type: type || 'button',
}))<{
  fullWidth?: boolean
  flat?: boolean
  theme: object
}>`
  width: ${({ fullWidth = false }) => (fullWidth ? '100%' : 'initial')};
  text-transform: uppercase;
  text-shadow: 2px 2px 5px #0002;
  border: none;
  background: no-repeat;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
  padding: 16px;
  border-radius: 30px;
  transition-duration: 200ms;
  box-shadow: ${({ flat = false }) =>
    flat
      ? '0px 0px 0px inset #fff0, 0px 0px 0px inset #0000'
      : '4px 4px 10px inset #ffffff18, -4px -4px 10px inset #00000016'};
  color: ${({ theme }) => theme.text.color};
  opacity: 0.8;
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: 4px 4px 10px inset #0001, -4px -4px 10px inset #fff1;
    transition-duration: 200ms;
    opacity: 1;
  }
  &:active:not(:disabled) {
    box-shadow: 4px 4px 10px inset #0002, -4px -4px 10px inset #fff1;
    transition-duration: 200ms;
    opacity: 1;
  }
  &:disabled {
    opacity: 0.3;
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
