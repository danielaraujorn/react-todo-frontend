import { createContext } from 'react'
import { theme, themeInterface } from '../theme'

export const InternalThemeContext = createContext({
  theme,
  setTheme: (newTheme: themeInterface): void => {}
})
