import { useContext, useEffect } from 'react'
import { themeType } from '../theme'
import { InternalThemeContext } from '../contexts/InternalThemeContext'

export const useInternalTheme = (theme: themeType) => {
  const { setTheme } = useContext(InternalThemeContext)
  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])
}
