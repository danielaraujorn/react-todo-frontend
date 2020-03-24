export const setCookie = (cname: string, cvalue: string, exSeconds: number) => {
  var d = new Date()
  d.setTime(d.getTime() + exSeconds * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const getCookie = (cname: string) => {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const deleteCookie = (name: string) => {
  if (getCookie(name)) {
    setCookie(name, '', -1000)
  }
}

const AUTH_COOKIE_NAME = 'authCookie'

export const setAuthToken = (cvalue: string, exdays: number) =>
  setCookie(AUTH_COOKIE_NAME, cvalue, exdays)

export const getAuthToken = () => getCookie(AUTH_COOKIE_NAME)

export const deleteAuthToken = () => deleteCookie(AUTH_COOKIE_NAME)
