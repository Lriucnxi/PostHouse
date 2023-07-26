<template>
  <div class="search">
    <div class="search-nav-bar">
      <!-- 顶部导航 -->
      <backNavBar
        :isShowRightIcon="true"
        @arrowIconClick="arrowIconClick"
        @menuIconClick="menuIconClick"
      >
        <template #title>
          <searchBar
            :keyWord="keyWord"
            :start-date="routeQuery.startDate"
            :end-date="routeQuery.endDate"
            :title="routeQuery.address"
            :cancel-icon="showCancelIcon"
            @cancel-click="handleCancelClick"
            @searchClick="handleSearchClick"
          ></searchBar>
        </template>
      </backNavBar>

      <!-- 位置 - 欢迎度排序 - 筛选 -->
      <dropdownSelect :itemsData="searchConditions" />

      <!-- 优惠 - 多人入驻 -->
      <div class="tab-wrapper">
        <tabSelect :itemsData="searchHouse.hotFilters" />
      </div>
    </div>
    <!-- 默认推荐列表 -->
    <div class="list">
      <template v-for="(item, index) in searchHouse.items">
        <favorSearchItem :itemData="item" />
      </template>
    </div>
    <!-- 点击搜索显示搜索面板 -->
    <searchPanel
      v-if="showSearchPanel"
      @cancel="handleCancel"
      @search="handleSearch"
      @resultItemClick="handleResultItemClick"
      @tagClick="handleTagClick"
      :searchPanelDatas="guessulike.groups"
    />
  </div>
</template>

<script setup>
import backNavBar from "@/components/backNavBar/backNavBar.vue";
import searchBar from "@/components/searchBar/searchBar.vue";
import dropdownSelect from "@/components/dropdown-select/dropdwonSelect.vue";
import tabSelect from "@/components/tabSelect/tabSelect.vue";
import favorSearchItem from "@/components/favorSearchItem/favorSearchItem.vue";
import searchPanel from "./cpns/search-panel/searchPanel.vue";
import useSearchStore from "@/stores/modules/search";

import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const showSearchPanel = ref(false); // 是否展示搜索面板

// 搜索框
const PLACEHOLDER = "搜索博尔塔拉的景点、地标、房源";
const routeQuery = ref(route.query);
const showCancelIcon = ref(false);
const keyWord = ref(PLACEHOLDER);

// 点击顶部导航返回按钮返回上一级
const arrowIconClick = () => {
  router.go(-1);
};
const menuIconClick = () => {
  console.log("menuIconClick");
};

// 顶部导航搜索区域
const handleSearchClick = () => {
  showSearchPanel.value = true;
};
const handleCancelClick = () => {
  keyWord.value = PLACEHOLDER;
  showCancelIcon.value = false;
  console.log("取消搜索");
};

// 搜索框搜索词
const handleTagClick = (value) => {
  showSearchPanel.value = false;
  if (value.keyWord) {
    showCancelIcon.value = true;
    keyWord.value = value.keyWord;
  } else {
    showCancelIcon.value = false;
  }
};

// 点击搜索结果选项
const handleResultItemClick = (item) => {
  handleTagClick({
    keyWord: item.name,
  });
};

// 点击搜索面板的--取消
const handleCancel = () => {
  showSearchPanel.value = false;
};
const handleSearch = () => {};

// 位置-欢迎度排序-筛选
const searchStore = useSearchStore();
searchStore.fetchSearchConditionsAction();
const { searchConditions } = storeToRefs(searchStore);

// 优惠 - 多人入驻
searchStore.fetchSearchHouseAction();
const { searchHouse } = storeToRefs(searchStore);

// 搜索默认推荐
searchStore.fetchGuessLikeAction();
const { guessulike } = storeToRefs(searchStore);
</script>

<style lang="scss" scoped>
:deep(.van-sticky--fixed .guide-login) {
  margin-left: 0;
  margin-right: 0;
}

.search {
  overflow: hidden;
  /* width: 100%; */
  height: 100%;
  .search-nav-bar {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .search-conditions {
    padding-top: 46px;
  }
  .tab-wrapper {
    padding: 12px 0 10px 20px;
    background-color: #f7f8fb;
  }
  .list {
    padding: 141px 20px 0 20px;
    z-index: -1;
    position: relative;
  }
}
</style>
