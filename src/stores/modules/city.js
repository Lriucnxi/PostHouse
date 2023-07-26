import {defineStore} from 'pinia'

import { getCityAll } from '@/service'

const useCityStore = defineStore('city', {
  state: () => ({
    allCity: {},
    currentCity: {cityName: '重庆'}
  }),
  actions: {
    // 获取所有城市数据
    async fetchAllCityDataAction(houseId) {
      const res = await getCityAll(houseId)
      this.allCity = res.data
    }
  }
})

export default useCityStore