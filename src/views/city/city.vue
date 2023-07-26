<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        shape="round"
        show-action
        placeholder="城市/区域/位置"
        @cancel="cancelClick"
      />

      <!-- tab切换
        tabActive默认绑定的是索引，也就是0和1
       -->
      <van-tabs 
        v-model:active="tabActive" 
        color="#ff9854" 
        line-height="3"
      >
        <!-- <van-tab :title="allCity?.cityGroup?.title"></van-tab>
      <van-tab :title="allCity?.cityGroupOverSea?.title"></van-tab> -->
        <!-- 遍历对象 -->
        <template 
          v-for="(value, key, index) in allCity" 
          :key="key"
        >
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- 这种做法可能会出现切换tab栏的时候数据响应有点慢 -->
      <!-- <cityGroup :groupData="currentCityGroup" /> -->
      <!-- 这种做法就相当于直接显示两个cityGroup，也就是提前将数据传递，只是通过display来控制其显示和隐藏 -->
      <template v-for="(value, key, index) in allCity">
        <cityGroup v-show="tabActive === key" :groupData="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

// import { getCityAll } from '@/service'
import useCityStore from "@/stores/modules/city";
import cityGroup from "./cpns/cityGroup.vue";

const router = useRouter();
const route = useRoute()

// 监听取消按钮点击事件
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};

// 监听tab栏切换
const tabActive = ref();
// 获取数据
/**
 * 这个位置发送网络请求有两个缺点:
 *   1.如果网络请求太多, 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
 *   2.如果页面封装了很多的子组件, 子组件需要这些数据, 我们必须一步步将数据传递过去(props)
 */
// const allCity = ref({})
// getCityAll().then(res => {
//   allCity.value = res.data
// })
const cityStore = useCityStore();
cityStore.fetchAllCityDataAction(route.params.houseId);
const { allCity } = storeToRefs(cityStore);

// 获取选中tab栏后的数据
// 不是响应式的数据，这里可以利用计算属性来做
// const currentCityGroup = allCity.value[tabActive.value]
// 1.获取正确的key: 将tabs中绑定的tabAction正确绑定
// 2.根据key从allCities获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
const currentCityGroup = computed(() => allCity.value[tabActive.value])
</script>

<style lang="scss" scoped>
.city {
  /* 重置tab栏高度 */
  --van-tabs-line-height: 30px;

  /* 滚动方式一 */
  /* .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    margin-top: 84px;
  } */

  .top {
    position: relative;
    z-index: 9;
  }

  /* 滚动方式二 */
  .content {
    height: calc(100vh - 84px);
    overflow-y: auto;
  }
}
</style>
