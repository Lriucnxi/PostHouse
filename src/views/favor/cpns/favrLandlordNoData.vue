<template>
  <div class="favor-landlord-no-data">
    <img class="icon-no-data" src="@/assets/images/favor/empty_favorite.44731802.png" alt="">
    <div class="name">暂无收藏</div>
    <div class="desp">
      点击
      <img src="@/assets/images/favor/favor.png" alt="">
      即可收藏对应的房东
    </div>
    <button class="btn" @click="handleBtnClick">随便逛逛</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const handleBtnClick = () => {
  router.push('/')
}
</script>

<style lang='scss' scoped>
.favor-landlord-no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon-no-data {
    width: 100%;
  }

  .name {
    color: #333;
    font-size: 18px;
    font-weight: 500px;
    line-height: 27px;
  }

  .desp {
    color: #666;
    line-height: 18px;
    font-size: 14px;
    margin: 7px auto 36px;

    img {
      position: relative;
      top: 4px;
      width: 12px;
    }
  }

  .btn {
    padding: 0 38px;
    height: 40px;
    line-height: 40px !important;
    font-size: 16px;
    color: #fff;
    background: var(--primary-color);
    border: none;
    outline: none;
    border-radius: 20px;
  }
}
</style>