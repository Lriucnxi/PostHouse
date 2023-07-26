<template>
  <div class="home-list">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <houseItemV3 
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="itemClick(item.data)"
        />
        <houseItemV9 
          v-else-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router";

import useHomeStore from '@/stores/modules/home';
import houseItemV3 from '@/components/house-item-v3/houseItemV3.vue';
import houseItemV9 from '@/components/house-item-v9/houseItemV9.vue';

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

// 跳转到详情页
const router = useRouter()
const itemClick = (item) => {
  router.push("/detail/" + item.houseId)
}
</script>

<style lang='scss' scoped>
.home-list {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>