<template>
  <!-- v-bind="$attrs" -->
  <van-nav-bar v-bind="$attrs" @click-left="handleLeftClick">
    <template #left>
      <slot name="left">
        <van-icon name="arrow-left" size="18" @click="leftIconClick" />
        <span class="left-text">{{ leftText }}</span>
      </slot>
    </template>
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>
    <template #right v-if="isShowRightIcon">
      <slot name="right">
        <van-icon name="wap-nav" size="18" />
      </slot>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  isShowRightIcon: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "标题",
  },
  leftText: {
    type: String,
    default: "",
  },
});

const router = useRouter();

// 监听返回按钮点击
// const onClickLeft = () => router.back();
const emit = defineEmits(["leftClick"]);

const leftIconClick = () => {};

const handleLeftClick = () => {
  router.go(-1);
  emit("leftClick");
};
</script>

<style lang="scss" scoped>
.left-text {
  color: var(--primary-color);
  margin-left: 8px;
  font-weight: 500;
}
</style>
