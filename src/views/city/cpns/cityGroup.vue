<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <!-- 热门区域 -->
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <!-- 列表 -->
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>

    <!-- <template v-for="(item, index) in groupData?.cities" :key="index">
      <div class="group-item">
        <h2>标题：{{ item.group }}</h2>
        <div class="list">
          <template v-for="(iten, index) in item.cities">
            <div class="city">{{ iten.cityName }}</div>
          </template>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import useCityStore from "@/stores/modules/city";

// props
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});

// 动态索引
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift('#')
  return list
})

// 监听热门城市选中
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 选中当前城市
  /* 对于这里我们可能会将当前选中的城市返回给不同的组件，
  那么到底是哪一个组件我们并不能确定。
  要实现可以通过事件总线，
  在这里我们只管通过$emit('cityChange')发送数据，在需要获取的
  组件里通过$on('')进行获取 */
  /*
  第二种方式就是通过状态管理，将其存储起来，哪个组件需要用到自己去获取即可
  */
  cityStore.currentCity = city

  // 返回上一级
  router.back()
}
</script>

<style lang="scss" scoped>
:deep(.van-index-anchor--sticky) {
  color: var(--primary-color) !important;
}
.list {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;
  flex-wrap: wrap;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    background-color: #fff4ec;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    margin: 6px 0;
  }
}
</style>