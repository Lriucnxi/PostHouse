<template>
  <div class="tab-control top-page">
    <template v-for="(item, index) in titles" :key="item">
      <div class="tab-control-item"
           :class="{ active: index === currentIndex }"
           @click="itemClick(index)">
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  titles: {
    type: Array,
    default: () => [],
  },
});

let currentIndex = ref(0);

const emit=defineEmits(['tabItemClick'])
const itemClick = (index) => {
  currentIndex.value = index;
  emit('tabItemClick' ,index)
};

const setCurrentIndex = (index) => {
  currentIndex.value = index
}

// 这是seutp语法糖需要注意的，父组件调用子组件里的方法或者变量时
// 需要先暴露出去
defineExpose({
  setCurrentIndex
})
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item.active {
  color: var( --primary-color);
  font-weight: 700;
}

.tab-control-item.active span {
  border-bottom: 3px solid var(--primary-color);
  padding: 8px;
}
</style>