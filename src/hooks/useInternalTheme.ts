import { useContext, useEffect } from 'react'
import { themeInterface } from '../theme'
import { InternalThemeContext } from '../contexts/InternalThemeContext'

export const useInternalTheme = (theme: themeInterface) => {
  const { setTheme } = useContext(InternalThemeContext)
  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])
}
