export function setLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function getLocalStorage(name) {
  return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : undefined
}

export function removeLocalStorage(name) {
  localStorage.removeItem(name)
}

/*
  格式化日期
*/
export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}