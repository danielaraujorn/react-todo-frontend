import { createContext } from 'react'

export const AuthContext = createContext({
  logged: false,
  logIn: (token: { accessToken: string; expiresIn: number }) => {},
  logOut: () => {}
})
