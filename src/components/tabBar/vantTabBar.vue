<template>
  <div class="tab-bar">
    <van-tabbar 
      v-model="currentIndex" 
      active-color="#ff9854" 
      route
    >
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import getAssetURL from "@/utils/getAssetsImage";

// 模拟tabbar数据
const tabbarData = [
  {
    text: "首页",
    image: "tab_home.png",
    imageActive: "tab_home_active.png",
    path: "/home",
    id: 1,
  },
  {
    text: "收藏",
    image: "tab_favor.png",
    imageActive: "tab_favor_active.png",
    path: "/favor",
    id: 2,
  },
  {
    text: "订单",
    image: "tab_order.png",
    imageActive: "tab_order_active.png",
    path: "/order",
    id: 3,
  },
  {
    text: "消息",
    image: "tab_message.png",
    imageActive: "tab_message.png",
    path: "/message",
    id: 4,
  },
];

// 监听路由改变时，找到对应的索引，设置currentIndex
const route = useRoute();
const currentIndex = ref(0);

// 监听tabbar切换
watch(route, (newRoute) => {
  const index = tabbarData.findIndex((item) => item.path === newRoute.path);
  if (index === -1) return;
  currentIndex.value = index;
});
</script>

<style lang="scss" scoped>
.tab-bar {
  // 2. 局部定义一个变量: 只针对.tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;
  /* --van-tabbar-item-icon-size: 30px !important; */

  // 3. 找到类, 对类中的CSS属性重写
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    font-size: 50px;
  }

  img {
    height: 26px;
  }
}
</style>