export interface themeInterface {
  primary: {
    main: string
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

export const theme: themeInterface = {
  primary: {
    main: '#666'
  },
  text: {
    color: 'white',
    placeholder: {
      color: '#FFFFFF65'
    }
  },
  icon: {
    color: 'white'
  }
}
