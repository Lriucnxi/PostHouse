import { defineStore } from "pinia";

import localCache from "@/utils/cache";
const CACHE_SERACH_HISTORY = "CACHE_SERACH_HISTORY";

import {
  getSearchConditions,
  getSearchHouse,
  keywordsearchsuggest,
  getGuessulike,
} from "@/service";

const useSearchStore = defineStore("search", {
  state: () => ({
    searchConditions: [],
    searchHouse: [],
    searchsuggest: [],
    guessulike: [],
    searchHistorys: [],
  }),
  getters: {
    getSearchHistorys: (state) => {
      let historys = state.searchHistorys || [];
      if (historys.length) {
        // 本地读取
        historys = localCache.getCache(CACHE_SERACH_HISTORY) || [];
      }
      historys = historys.reverse();
      return historys.map((item) => {
        return {
          itemType: "搜索历史",
          name: item,
        };
      });
    },
  },
  actions: {
    // 位置-欢迎度排序-筛选
    async fetchSearchConditionsAction() {
      const res = await getSearchConditions();
      this.searchConditions = res.data.data.allConditions || [];
    },
    // 优惠 - 多人入驻
    async fetchSearchHouseAction() {
      const res = await getSearchHouse();
      this.searchHouse = res.data.data || [];
    },
    // 搜索
    async fetchKeywordsearchsuggestAction(keyword) {
      const res = await keywordsearchsuggest(keyword);
      this.searchsuggest = res.data.suggests || [];
    },

    // 热门搜索-景点-商圈-地铁站-房型-行政区等数据
    async fetchGuessLikeAction() {
      const res = await getGuessulike();
      this.guessulike = res.data || [];
    },
    addSearchHistory(keyWorld) {
      if (!this.searchHistorys.includes(keyWorld)) {
        this.searchHistorys.push(keyWorld);
      }
      // 只缓存10个历史记录
      let len = this.searchHistorys.length;
      if (len >= 10) {
        this.searchHistorys = this.searchHistorys.slice(len - 10, len);
      }
      // 本地读取
      localCache.setCache(CACHE_SERACH_HISTORY, this.searchHistorys);
    },
    initSearchHistory() {
      this.searchHistorys = localCache.getCache(CACHE_SERACH_HISTORY) || [];
    },
    clearSearchHistory() {
      this.searchHistorys = [];
      localCache.deleteCache(CACHE_SERACH_HISTORY);
    },
  },
});

export default useSearchStore;
