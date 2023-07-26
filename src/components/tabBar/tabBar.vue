<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData" :key="item.id">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <img
          v-if="currentIndex !== index"
          :src="getAssetsURL(item.image)"
          alt=""
        />
        <img
          v-else="currentIndex === index"
          :src="getAssetsURL(item.imageActive)"
          alt=""
        />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import getAssetsURL from "@/utils/getAssetsImage";
import { ref } from "vue";
import { useRouter } from "vue-router";

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
    imageActive: "tab_message_active.png",
    path: "/message",
    id: 4,
  },
];

const currentIndex = ref(0);
const router = useRouter()
const itemClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      color: var(--primary-color);
    }

    .text {
      font-size: 12px;
      margin-top: 2px;
    }

    img {
      width: 36px;
    }
  }
}
</style>
