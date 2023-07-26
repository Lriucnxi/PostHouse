<template>
  <div class="search-panel">
    <!-- 搜索栏 -->
    <!-- <div class="search-box"> -->
    <van-search
      v-model="value"
      show-action
      placeholder="搜索重庆的景点、地标、房源"
      shape="round"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- </div> -->
    <!-- 搜索结果区域 -->
    <div v-if="searchsuggest?.length" class="search-result-panel">
      <template v-for="(item, index) in searchsuggest" :key="index">
        <searchResultItem
          :key-word="value"
          :name="item.name"
          :type-name="item.itemTypeName"
          :description="item.description"
          :unitPrice="item.unitPrice"
          @item-click="handleResultItemClick"
        />
      </template>
    </div>

    <!-- 默认展示区域 -->
    <div v-else class="search-category-panel">
      <!-- 搜索历史 -->
      <searchCategory
        title="搜索历史"
        :itemDatas="searchStore.getSearchHistorys"
        itemType="pink"
        @tag-click="handleTagClick($event, item)"
      >
        <template #more>
          <div class="clear" @click="handleClearSearchHistory">
            <span class="name">清空</span>
            <i class="icon-delete"></i>
          </div>
        </template>
      </searchCategory>
      <template v-for="(item, index) in searchPanelDatas" :key="index">
        <search-category
          v-if="item.suggests"
          :title="item.name"
          :itemDatas="item.suggests"
          :itemType="index === 0 ? 'pink' : 'gray'"
          @tag-click="handleTagClick($event, item)"
        ></search-category>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import { debounce } from "@/utils/common.js";
import useSearchStore from "@/stores/modules/search";
import searchResultItem from "../search-result-item/searchResultItem.vue";
import searchCategory from "../search-category/searchCategory.vue";

const props = defineProps({
  searchPanelDatas: { type: Array, default: () => [] },
});

// 变量
const value = ref(""); // 搜索框初始值
const searchsuggest = ref([]); // 搜索结果列表

const emit = defineEmits(["cancel", "search", "resultItemClick"]);

// 搜索框
const onCancel = () => {
  // 取消搜索
  emit("cancel");
};
const onSearch = () => {
  // 搜索
  emit("search", value.value);
};

// 搜索
const searchStore = useSearchStore();
searchStore.initSearchHistory();

watch(
  value,
  debounce((newValue, oldValue) => {
    // 若搜索框为空，直接返回--不发送任何请求
    if (!newValue.trim()) {
      return;
    }
    // 缓存到搜索历史中
    searchStore.addSearchHistory(newValue);

    // 发送请求
    searchStore.fetchKeywordsearchsuggestAction(newValue);
    searchsuggest.value = searchStore.searchsuggest;
  })
);
const handleResultItemClick = (item) => {
  // 点击搜索结果选项
  emit("resultItemClick", item);
};

const handleTagClick = (subItem, item) => {
  emit("tagClick", { typeName: item.name, keyWord: subItem.name });
};
const handleClearSearchHistory = () => {
  searchStore.clearSearchHistory();
};
</script>

<style lang="scss" scoped>
// 重写Vant样式
:global(.search-panel .van-search--show-action) {
  padding-left: 0px;
}
.search-panel :deep(.van-search) {
  .van-field__left-icon .van-icon-search {
    font-size: 25px;
  }
  .van-field__control::placeholder {
    font-size: 13px;
    color: #ccc !important;
  }
}

.search-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  padding: 0px 20px;
  background-color: white;
  overflow-y: auto;
}

.search-category-panel {
  overflow-y: scroll;
  padding-top: 30px;
  height: calc(100% - 100px);
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  .clear {
    .name {
      font-size: 12px;
      color: #333;
      padding-right: 4px;
    }
    .icon-delete {
      position: relative;
      top: 1px;
      display: inline-block;
      background-image: url(@/assets/images/home/home-sprite.png);
      background-size: 207px 192px;
      background-position: -150px -133px;
      width: 11px;
      height: 11px;
    }
  }
}
</style>
