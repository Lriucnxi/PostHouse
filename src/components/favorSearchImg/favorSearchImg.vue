<template>
  <div class="favor-search-img">
    <img class="banner" :src="favorListDataBanner" alt="" />
  </div>
</template>

<script setup>
defineProps ({
  favorListDataBanner: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.banner {
    width: 100%;
    border-radius: 6px;
    margin-bottom: 7px;
}
</style>