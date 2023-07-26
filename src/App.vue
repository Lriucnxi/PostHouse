<template>
  <div class="app">

    <RouterView v-slot="props">
      <KeepAlive include="home">
        <component :is="props.Component"></component>
      </KeepAlive>
    </RouterView>
    
    <vantTabBar v-show="!route.meta.hideTabBar" />
    <loading />
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
import vantTabBar from './components/tabBar/vantTabBar.vue';
import loading from './components/loading/loading.vue';

const route = useRoute(); // route 对象默认是响应式的
</script>

<style scoped lang="scss">
</style>