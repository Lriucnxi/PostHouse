import { defineStore } from "pinia";

import { getFavorList, getHistoryList } from "@/service";

const useFavorStore = defineStore("favor", {
  state: () => ({
    favorList: [],
    historylist: [],
  }),
  actions: {
    //我的收藏-房屋
    async fetchFavorListAction() {
      const res = await getFavorList();
      this.favorList = res.data.data.items || [];
    },
    async fetchFavorGetHistoryyListAction() {
      const res = await getHistoryList();
      this.historylist = res.data.data.items || [];
    },
  },
});

export default useFavorStore;
