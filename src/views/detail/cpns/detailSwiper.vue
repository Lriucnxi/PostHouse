<template>
  <div class="swiper">
    <van-swipe :autoplay="3000" lazy-render class="swiper-list" loop>
      <template v-for="(item, index) in swiperData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" />
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swiperGroup" :key="key">
            <span 
              class="item" 
              :class="{ active: swiperData[active]?.enumPictureCategory == key }"
          >
            <span class="text">{{ getName(value[0].title) }}</span>
            <span 
              class="count"
              v-if="swiperData[active]?.enumPictureCategory == key"
            >
              {{ getCategoryIndex(swiperData[active]) }}/{{ value.length }}
            </span>
          </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swiperData: {
    type: Array,
    default: () => [],
  },
});

// 对轮播图数据进行转换处理
const swiperGroup = {}
// 方式一：
// for(const item of props.swiperData){
//   swiperGroup[item.enumPictureCategory] = []
// }
// for(const item of props.swiperData){
//   const valueArray = swiperGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }

// 方式二：
for(const item of props.swiperData){
  let valueArray = swiperGroup[item.enumPictureCategory]
  if(!valueArray) {
    valueArray = []
    swiperGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

// 定义转换数据方法
const nameReg = /【(.*?)】/i
const getName = (name) => {
  // 方式一
  // return name.replace("：", "").replace("】", "").replace("【", "")
  // 方式二：
  const result = nameReg.exec(name)
  return result[1]
}

// 分类索引
const getCategoryIndex = (item) => {
  const valueArray = swiperGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}

</script>

<style lang="scss" scoped>
.swiper {
  .swiper-list {
    .item {
      img {
        width: 100%;
      }
    }
    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      .item {
        margin: 0 5px;
        &.active {
          background-color: #fff;
          color: #333;
          padding: 0 3px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>