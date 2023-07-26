<template>
  <div class="detail-infos">
    <div class="name">{{ topInfos?.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topInfos?.houseTags">
        <span v-if="item.tagText" class="item"
          :style="{ color: item.tagText.color, background: item.tagText.background.color }">
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="extra comment">
      <div class="left">
        <span class="score">{{ topInfos?.commentBrief?.overall }}</span>
        <span class="title">{{ topInfos?.commentBrief?.scoreTitle }}</span>
        <span class="brief">"{{ topInfos?.commentBrief?.commentBrief }}"</span>
      </div>
      <div class="right">
        <span class="count">{{ topInfos?.commentBrief?.totalCount + "条评论 >" }}</span>
      </div>
    </div>
    <div class="extra position">
      <div class="left address">
        {{ topInfos?.nearByPosition?.address }}
      </div>
      <div class="right">
        地图·周边 >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  topInfos: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang='scss' scoped>
.detail-infos {
  padding: 16px;
  background-color: #fff;
  .name {
    font-weight: 700;
    font-size: 20px;
    color: #333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }

  .tags {
    margin: 10px 0;

    .item {
      font-size: 12px;
      margin: 0 2px;
      padding: 1px 3px;
    }
  }

  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    font-size: 12px;
    background-color: #f5f7fa;

    .right {
      color: #ff9645;
    }
  }
  .comment {
    .score {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    .title {
      color: #333;
      font-weight: 700;
      margin: 0 3px;
    }

    .brief {
      color: #666;
    }
  }

  .position {
    .address {
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
  }
}
</style>