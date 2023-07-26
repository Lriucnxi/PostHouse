import lwjRequest from '../request';

export function getDetailInfos(houseId) {
  return lwjRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}