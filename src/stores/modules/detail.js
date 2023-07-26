import { defineStore } from 'pinia';

import { getDetailInfos } from '@/service';

const useDetailStore = defineStore('detail', {
  state: () => ({
    detailInfos: {}
  }),
  actions: {
    async fetchDetailInfoAction(houseId) {
      const res = await getDetailInfos(houseId)
      this.detailInfos = res.data
    }
  },
  getters: {}
})

export default useDetailStore