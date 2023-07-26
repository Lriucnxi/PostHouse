import lwjRequest from '../request'

export function getCityAll() {
  return lwjRequest.get({
    url: '/city/all'
  })
}