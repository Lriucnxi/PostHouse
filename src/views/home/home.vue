<template>
  <div class="home" ref="homeRef">
    <homeNavBar />
    <homeBanner />
    <homeSearchBox />
    <homeCategory />
    <div class="search-bar" v-if="isShowSearchBar">
      <searchBar
        :start-date="startDateStr"
        :end-date="endDateStr"
        height="45px"
        key-word-font-size="14px"
        :search-icon="true"
        key-word="关键字/位置/民宿"
        @searchClick="handleSearchClick"
      />
    </div>
    <homeList />
  </div>
</template>

<script setup name="home">
import { watch, ref, computed, onActivated, onUpdated } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import homeNavBar from "./cpns/homeNavBar.vue";
import homeBanner from "./cpns/homeBanner.vue";
import homeSearchBox from "./cpns/homeSearchBox.vue";
import homeCategory from "./cpns/homeCategory.vue";
import homeList from "./cpns/homeList.vue";
import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll";
import searchBar from "@/components/searchBar/searchBar.vue";
import useMainStore from "@/stores/modules/main";
import { formatMonthDay } from "@/utils/format_date";

const router = useRouter();

const homeStore = useHomeStore();
homeStore.fetchHouseListDataAction();
const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);
const startDateStr = computed(() => formatMonthDay(startDate.value, "MM.DD"));
const endDateStr = computed(() => formatMonthDay(endDate.value, "MM.DD"));

// 点击搜索栏进行跳转传值
const handleSearchClick = () => {
  router.push({
    path: "/search",
    query: {
      address: "重庆",
      cityId: 45,
      startDate: formatMonthDay(startDate.value, "MM.DD"),
      endDate: formatMonthDay(endDate.value, "MM.DD"),
    },
  });
};

// 监听滚动到底部
// 方式1：传入回调，但是如果还有其他事件可能就需要传入另一个回调，这样
// 的话就不是很好管理
// useScroll(() => {
//   homeStore.fetchHouseListDataAction();
// })

// 方式2：传入变量
let height = -1;
const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseListDataAction().then(() => {
      isReachBottom.value = false;
    });
  }
});

// 搜索框显示的控制
// 方式一
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 360
// })
// 方式二：计算属性
const isShowSearchBar = computed(() => {
  height = scrollTop;
  return scrollTop.value >= 360;
});

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
// onUpdated(() => {
//   homeRef.value?.scrollTo({
//     top: height.value
//   })
// })
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;

  padding-bottom: 60px;
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
