import React, { FunctionComponent, useState, useMemo } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Input } from '../Input'
import { IconButton } from '../Button'

type PasswordInputProps = {
  value: string
  onChange: (e: { target: { value: string } }) => void
  placeholder?: string
  inputProps?: any
}

export const PasswordInput: FunctionComponent<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  inputProps,
}) => {
  const [visible, setVisible] = useState(false)
  const icon = useMemo(() => (visible ? <FiEyeOff /> : <FiEye />), [visible])
  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder={placeholder || 'Senha'}
      inputProps={inputProps}
      value={value}
      onChange={onChange}
      right={
        <IconButton onClick={() => setVisible(!visible)}>{icon}</IconButton>
      }
    />
  )
}
