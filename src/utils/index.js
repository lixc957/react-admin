export function setLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function getLocalStorage(name) {
  return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : undefined
}

export function removeLocalStorage(name) {
  localStorage.removeItem(name)
}