export const makeApiUrl = (path: string): string => {
  return `http://fordevs.herokuapp.com/api${path}` // CLEAN-API = http://localhost/api/login
}
