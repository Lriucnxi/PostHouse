<template>
  <div class="loading" @click="loadingClick" v-if="mainStore.isLoding">
    <div class="bg">
      <img src="@/assets/images/home/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';

const mainStore = useMainStore()

// 监听蒙版的点击事件
const loadingClick = () => {
  mainStore.isLoding = false
}
</script>

<style lang='scss' scoped>
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  /* 蒙版 */
  background-color: rgba(0,0,0,.2);

  .bg {
    width: 104px;
    height: 104px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(@/assets/images/home/loading-bg.png) 0 0 / 100% 100%;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
  }
}
</style>