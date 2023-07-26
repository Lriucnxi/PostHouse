<template>
  <div class="intro">
    <h2 class="title">{{ intro.title }}</h2>
    <div class="content">
      {{ intro.introduction }}
    </div>
  </div>
</template>

<script setup name="home">
  defineProps({
    intro: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<style lang='scss' scoped>
.intro {
  padding: 16px 12px;
  border-top: 5px solid #f2f3f4;
  .title {
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }
  .content {
    padding: 10px;
    color: #666;
  }
}
</style>