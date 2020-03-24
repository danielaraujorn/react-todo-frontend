import React, { FunctionComponent, ReactNode, useState } from 'react'
import { Box } from '../Box'
import * as Styled from './style'

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
  name
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
        required={required || inputProps.required}
        type={type || inputProps.type}
        autoFocus={autoFocus || inputProps.autoFocus}
        placeholder={placeholder || inputProps.placeholder}
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}
