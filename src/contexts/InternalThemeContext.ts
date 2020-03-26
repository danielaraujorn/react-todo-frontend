import { createContext } from 'react'
import { theme, themeType } from '../theme'

export const InternalThemeContext = createContext({
  theme,
  setTheme: (newTheme: themeType): void => {
    return
  },
})
