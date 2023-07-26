<template>
  <div class="search-category">
    <div class="title">
      <!-- 标题 -->
      <span class="name">{{ title }}</span>
      <!-- 展开/收起 -->
      <div class="more" @click="moreClick">
        <slot name="more">
          <span class="m-name" v-if="moreIconIsDown">展开</span>
          <span class="m-name" v-else>收起</span>
          <!-- 图标 -->
          <i :class="['icon-more', moreIconIsDown ? 'down' : 'up']"></i>
        </slot>
      </div>
    </div>
    <!-- 内容区域 -->
    <div :class="['content', moreIconIsDown ? 'hidden' : 'show-all']">
      <template v-for="item in itemDatas">
        <tabSelectItem
          :type="itemType"
          :title="item.name"
          border-width="0px"
          @tag-click="handleTagClick(item)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import tabSelectItem from "@/components/tabSelectItem/tabSelectItem.vue";

const moreIconIsDown = ref(true);

const props = defineProps({
  title: {
    type: String,
    default: "热门搜索",
  },
  itemDatas: {
    type: Array,
    default: () => [],
  },
  itemType: {
    type: String,
    default: "default",
  },
});

// 点击收起/展开
const moreClick = () => {
  moreIconIsDown.value = !moreIconIsDown.value;
};

const emit = defineEmits(["tagClick"]);
// 子项
const handleTagClick = (item) => {
  emit("tagClick", item);
};
</script>

<style lang="scss" scoped>
.search-category {
  .title {
    display: flex;
    justify-content: space-between;
    .name {
      position: relative;
      padding-left: 10px;
      font-weight: 500;
      font-size: 16px;
      color: #333;
      &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 0;
        width: 3px;
        height: 15px;
        background-color: var(--primary-color);
      }
    }
  }

  .more {
    display: flex;
    justify-content: center;
    align-items: center;
    .m-name {
      font-weight: 500;
      font-size: 10px;
      color: #666;
      line-height: 20px;
      height: 20;
      margin-right: 5px;
    }

    .icon-more {
      display: inline-block;
      background-image: url(@/assets/images/home/home-sprite.png);
      width: 10px;
      height: 5.5px;
      background-size: 207px 192px;
    }
    .down {
      background-position: -178px -121px;
    }
    .up {
      background-position: -176px -133px;
    }
  }

  .content {
    margin-top: 7px;
    margin-bottom: 22px;
  }
  .content.hidden {
    max-height: 60px;
    overflow-y: hidden;
  }
}
</style>
