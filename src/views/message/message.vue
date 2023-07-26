<template>
  <div class="message">
    <!-- 导航栏 -->
    <!-- <backNavBar :isShowRightIcon="true" :title="'消息中心'" /> -->
    <backNavBar :isShowRightIcon="true">
      <template #title>消息中心</template>
    </backNavBar>

    <!-- 内容区域 -->
    <div class="main">
      <img src="@/assets/images/message/icon_message.png" alt="">
      <div class="text">暂无聊天消息</div>
    </div>
  </div>
</template>

<script setup>
import backNavBar from '@/components/backNavBar/backNavBar.vue';

</script>

<style lang='scss' scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  img {
    width: 88%;
  }
}
</style>