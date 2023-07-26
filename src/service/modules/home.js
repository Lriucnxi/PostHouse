import lwjRequest from '../request'

// 热门城市数据
export function getHotSuggests() {
  return lwjRequest.get({
    url: '/home/hotSuggests'
  })
}

// 分类数据
export function getHomeCategories() {
  return lwjRequest.get({
    url: '/home/categories'
  })
}

// 房屋列表数据
export function getHoumeHouseList(currentPage) {
  return lwjRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}