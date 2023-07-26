import {defineStore} from 'pinia'

import { getHotSuggests, getHomeCategories, getHoumeHouseList }  from '@/service'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    currentPage: 1,
    houseList: []
  }),
  actions: {
    // 获取热门搜索数据
    async fetchHotSuggestsAction() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    },
    // 分类数据
    async fetchCategoriesDataAction() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    // 房屋列表数据
    async fetchHouseListDataAction() {
      const res = await getHoumeHouseList(this.currentPage)
      this.houseList.push(...res.data)
      // currentPage代表的是下一次请求的页码
      this.currentPage++
    }
  }
})

export default useHomeStore