import React, { FunctionComponent, useState, useMemo } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Input } from '../Input'
import { IconButton } from '../Button'

type PasswordInputProps = {
  value: string
  onChange: Function
}

export const PasswordInput: FunctionComponent<PasswordInputProps> = ({
  value,
  onChange = () => {}
}) => {
  const [visible, setVisible] = useState(false)
  const icon = useMemo(() => (visible ? <FiEyeOff /> : <FiEye />), [visible])
  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder='Senha'
      value={value}
      onChange={onChange}
      right={
        <IconButton onClick={() => setVisible(!visible)}>{icon}</IconButton>
      }
    />
  )
}
