<template>
  <div class="search-list-item">
    <div class="swiper-wrapper">
      <!-- 轮播图 -->
      <favorSearchImg :favorListDataBanner="favorData.defaultPicture" />
      <!-- 分页器 -->
      <div class="bottom">
        <msgTip :favorListDataMsgTip="favorData.commentBriefForCD" />
      </div>
      <!-- 侧边栏 -->
      <div class="side-bar">
        <favorSearchAside :favorDataAsideBar="getToolBarData" />
      </div>
    </div>
    <!-- 内容区域--标题、介绍 -->
    <div class="content">
      <favorSearchTitle :favorDataTitle="getTitleData" />
      <favorSearchInfo :favorDataInfo="getInfoData" />
    </div>
  </div>
</template>

<script setup name="favorItem">
import favorSearchImg from '../favorSearchImg/favorSearchImg.vue';
import msgTip from '../msgTip/msgTip.vue';
import favorSearchAside from '../favorSearchAside/favorSearchAside.vue';
import favorSearchTitle from '../favorSearchTitle/favorSearchTitle.vue';
import favorSearchInfo from '../fovarSearchInfo/fovarSearchInfo.vue';

import { ref, watch, computed } from 'vue';

const props = defineProps({
  itemData: {
    type: Object,
    default: () => {}
  }
})

const favorData = ref({})
watch(
  () => props.itemData,
  (newValue, oldValue) => {
    favorData.value = newValue;
  },
  {
    immediate: true,
  }
);

// 先处理侧边栏数据，再传递给子组件
const getToolBarData = computed(() => {
  let data = favorData.value;

  let favoriteCount = 0;
  let totalCount = 0;
  if (data.preloadHouse) {
    favoriteCount = data.preloadHouse.favoriteCount;
    totalCount = data.preloadHouse.totalCount;
  } else {
    totalCount = data.commentBriefForCD.totalCount;
  }
  return {
    logoUrl: data.logoUrl,
    favoriteCount,
    totalCount,
  };
});

// 先处理标题数据，在传递给子组件
const getTitleData = computed(() => {
  let data = favorData.value
  return {
    address: data.address,
    unit: data.unitSummeries[0]?.text,
    unitDesp: data.unitSummeries[1]?.text,
    unitName: data.unitName
  }
})

// 先处理好价格等数据在传递给子组件
const getInfoData = computed(() => {
  let data = favorData.value
  return {
    houseTags: data.houseTags,
    promoContent: data.promoContent,
    finalPrice: data.finalPrice,
    productPrice: data.productPrice,
    priceTipBadge: data.priceTipBadge,
  };
})
</script>

<style lang="scss" scoped>
.search-list-item {
  margin: 10px 0px;
}
.swiper-wrapper {
  position: relative;
  .banner {
    width: 100%;
    border-radius: 6px;
    margin-bottom: 7px;
  }
  .bottom {
    position: absolute;
    bottom: 15px;
    left: 10px;
    right: 10px;
  }
  .side-bar {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>