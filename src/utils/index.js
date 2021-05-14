export function setLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function getLocalStorage(name) {
  let v = localStorage.getItem(name)
  let falg = (v.substr(0, 1) === '{' && v.substr(-1, 1) === '}') || (v.substr(0, 1) === '[' && v.substr(-1, 1) === ']')
  return v !== 'undefined' ? (falg ? JSON.parse(v) : v) : undefined
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