export type themeType = {
  primary: {
    main: string
    dark: string
  }
  text: {
    color: string
    placeholder: {
      color: string
    }
  }
  icon: {
    color: string
  }
}

export const theme: themeType = {
  primary: {
    main: '#444',
    dark: '#444',
  },
  text: {
    color: 'white',
    placeholder: {
      color: '#FFFFFF65',
    },
  },
  icon: {
    color: 'white',
  },
}
