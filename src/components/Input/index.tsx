import React, { FunctionComponent, ReactNode, useState } from 'react'
import * as Styled from './style'
import { Box } from '../Box'

type InputProps = {
  right?: ReactNode
  placeholder?: string
  type?: string
  value: string
  name?: string
  onChange: Function
  inputProps?: any
  autoFocus?: boolean
  required?: boolean
  disabled?: boolean
  autoComplete?: boolean
}

export const Input: FunctionComponent<InputProps> = ({
  right,
  inputProps = {},
  onChange,
  value,
  placeholder,
  autoFocus,
  required,
  type,
  name,
  disabled,
  autoComplete
}) => {
  const { onFocus, onBlur } = inputProps
  const [focused, setFocused] = useState(false)
  return (
    <Box variant={focused ? 'concave' : 'inset'} right={right}>
      <Styled.Input
        {...inputProps}
        onFocus={() => {
          setFocused(true)
          onFocus && onFocus()
        }}
        onBlur={() => {
          setFocused(false)
          onBlur && onBlur()
        }}
        name={name || inputProps.name}
        disabled={disabled || inputProps.disabled}
        required={required || inputProps.required}
        type={type || inputProps.type}
        autoFocus={autoFocus || inputProps.autoFocus}
        autoComplete={autoComplete || inputProps.autoComplete}
        placeholder={placeholder || inputProps.placeholder}
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}
