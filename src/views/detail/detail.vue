<template>
  <div class="detail top-page" ref="detailRef">
    <tabControl
      :titles="titles"
      class="tabs"
      v-if="showTabControl"
      @tabItemClick="tabItemClick"
      ref="tabControlRef"
    />

    <!-- 导航栏 -->
    <!-- <backNavBar :title="'房屋详情'" /> -->
    <backNavBar>
      <template #title>房屋详情</template>
    </backNavBar>
    <!-- <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    /> -->

    <!-- 主体内容区域 -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <detailSwiper :swiper-data="mainPart.topModule.housePicture.housePics" />
      <!-- 详情信息 -->
      <DetailInfos :ref="getSectionRef" name="描述" :topInfos="topModule" />
      <!-- 房屋设施 -->
      <detailFacility
        :ref="getSectionRef"
        name="设施"
        :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <!-- 房东介绍 -->
      <detailLandlord
        :ref="getSectionRef"
        name="房东"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <!-- 热门评论 -->
      <detailComment
        :ref="getSectionRef"
        name="评价"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <!-- 预订须知 -->
      <detailNotice
        :ref="getSectionRef"
        name="预订"
        :orderRules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <!-- 位置周边 -->
      <detailMap
        :ref="getSectionRef"
        name="周边"
        :position="mainPart.dynamicModule.positionModule"
      />
      <!-- 价格说明 -->
      <detailIntro
        :ref="getSectionRef"
        name="价格"
        :intro="mainPart.introductionModule"
      />
      <!-- 底部工具栏 -->
      <detailToolBar :current-house="currentHouse" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

import useDetailStore from "@/stores/modules/detail";
import tabControl from "@/components/tab-control/tabControl.vue";
// import tabControl from "@/components/tab-control/tab-control.vue";
import backNavBar from "@/components/backNavBar/backNavBar.vue";
import detailSwiper from "./cpns/detailSwiper.vue";
import DetailInfos from "./cpns/detailInfos.vue";
import detailFacility from "./cpns/detailFacility.vue";
import detailLandlord from "./cpns/detailLandlord.vue";
import detailComment from "./cpns/detailComment.vue";
import detailNotice from "./cpns/detailNotice.vue";
import detailMap from "./cpns/detailMap.vue";
import detailIntro from "./cpns/detailIntro.vue";
import detailToolBar from "./cpns/detailToolBar.vue";
import useScroll from "@/hooks/useScroll";

const route = useRoute();
const router = useRouter();

const detailStore = useDetailStore();
detailStore.fetchDetailInfoAction(route.params.id);
const { detailInfos } = storeToRefs(detailStore);
const mainPart = computed(() => detailInfos.value?.mainPart);
const topModule = computed(() => detailInfos.value?.mainPart?.topModule);
const currentHouse = computed(() => detailInfos.value?.currentHouse);

// 监听返回按钮点击
// const onClickLeft = () => router.back();

// tabControl相关操作
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
  return scrollTop.value >= 300;
});

// 获取某个区域里的ref
const sectionEls = ref({});
const titles = computed(() => {
  return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
  const name = value?.$el.getAttribute("name");
  sectionEls.value[name] = value?.$el;
};
// 点击事件
// let isClick = false // 当前是否是点击事件--默认不是（为了解决滚动到一定区域后点击Tab栏选项会出现一个跳{卡顿}的过程）
// let currentDistance = -1
const tabItemClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let instance = el.offsetTop;
  if (index !== 0) {
    instance = instance - 44;
  }

  // isClick = true
  // currentDistance = instance

  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth",
  });
};

// 监听页面滚动，滚动时匹配对应的tabControl里的index
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  // if (newValue == currentDistance) {
  //   isClick = false
  // }
  // if (isClick) return

  // 1. 获取所有区域的offsetTop值
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);

  // 2. 根据newValue去匹配想要的索引
  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    // 需要加上顶部tab栏的高度
    if (values[i] > newValue + 44) {
      index = i - 1;
      break;
    }
  }
  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  background-color: #fff;
}
.detail {
  padding-bottom: 60px;
}
</style>
