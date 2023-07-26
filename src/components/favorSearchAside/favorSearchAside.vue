<template>
  <div class="tool-bar">
    <img class="avatar" :src="favorDataAsideBar.logoUrl" alt="" />
    <div class="collection">
      <img
        class="heart-img"
        src="../../assets/images/search/tj-mob-ui_unit-item_collected-new.png"
        alt=""
      />
      <span v-if="favorDataAsideBar.favoriteCount">{{ favorDataAsideBar.favoriteCount }}</span>
    </div>
    <div class="message">
      <img
        class="msg-img"
        src="../../assets/images/search/tj-mob-ui_unit-item_comment-new.png"
        alt=""
      />
      <span>{{ favorDataAsideBar.totalCount }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  favorDataAsideBar: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang='scss' scoped>
.tool-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 5px;
}
.message,
.collection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  .msg-img,
  .heart-img {
    width: 30px;
    height: 30px;
  }
  span {
    color: white;
  }
}
</style>