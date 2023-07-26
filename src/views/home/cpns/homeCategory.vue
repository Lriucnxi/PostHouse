<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";

import { storeToRefs } from "pinia";

// 分类数据
const homeStore = useHomeStore();
homeStore.fetchCategoriesDataAction();
const { categories } = storeToRefs(homeStore);
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  overflow-y: auto;
  height: 80px;
  padding: 0 10px;
  margin-top: 8px;
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    flex-shrink: 0;
    img {
      width: 32px;
      height: 32px;
    }
    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>