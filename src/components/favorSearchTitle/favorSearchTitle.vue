<template>
  <div class="fovar-search-title">
    <div class="info">
      <van-tag color="#3f4954" text-color="#fff">
        {{ favorDataTitle.address }}
      </van-tag>
      <div class="name">{{ favorDataTitle.unit }}</div>
      <div class="desp">{{ favorDataTitle.unitDesp }}</div>
    </div>
    <div class="title ellipsis-text-2">{{ favorDataTitle.unitName }}</div>
  </div>
</template>

<script setup>
defineProps({
  favorDataTitle: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.fovar-search-title {
  .info {
    display: flex;
    align-items: center;

    .name,
    .desp {
      font-size: 12px;
      white-space: nowrap;
      color: #666;
    }

    .name {
      position: relative;
      margin-left: 10px;
      margin-right: 10px;
      /* 小圆点 */
      &::after {
        position: absolute;
        content: "";
        top: 45%;
        right: -25%;
        width: 2px;
        height: 2px;
        border-radius: 2px;
        background-color: #ff9854;
      }
    }
  }
  .title {
    line-height: 22px;
    font-size: 18px;
    margin-top: 8px;
    font-weight: 500;
  }
}
</style>