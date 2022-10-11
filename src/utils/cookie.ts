export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(name: string, value: string | null, seconds?: number) {
  let expires = ''
  if (seconds) {
    const date = new Date()
    date.setTime(date.getTime() + (seconds * 1000))
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

export function deleteCookie(name: string) {
  setCookie(name, null, -1)
}