export const getLocalStorageItem = (key: string): any => {
  return JSON.parse(localStorage.getItem(key) || '')
}

export const setLocalStorageItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
