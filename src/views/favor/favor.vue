<template>
  <div class="favor">
    <!-- 导航栏 -->
    <backNavBar :isShowRightIcon="true">
      <template #title>
        <van-tabs v-model:active="active" type="card" shrink>
          <van-tab v-for="item in titles" :key="item" :title="item"></van-tab>
        </van-tabs>
      </template>
    </backNavBar>
    <!-- 我的收藏 -->
    <div v-if="active === 0" class="favor">
      <van-tabs v-model:active="activeName" animated>
        <van-tab title="房屋" name="house">
          <div class="content">
            <template v-for="(item, index) in favorList">
              <favorSearchItem :itemData="item" />
            </template>
          </div>
        </van-tab>
        <van-tab title="房东" name="landlord">
          <div class="content">
            <favorLandoord v-if="landlordlist.length" class="list" />
            <favrLandlordNoData v-else />
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 浏览历史 -->
    <div v-if="active === 1" class="history content">
      <template v-for="(item, index) in historylist" :key="index">
        <favorSearchItem :itemData="item" />
        <!-- <favorSearchItem :itemData="item" @click="itemClick(item)" /> -->
      </template>
    </div>
  </div>
</template>

<script setup>
import backNavBar from "@/components/backNavBar/backNavBar.vue";
import useFavorStore from "@/stores/modules/favor";
import favorSearchItem from "@/components/favorSearchItem/favorSearchItem.vue";
import favorLandoord from "./cpns/favrLandlord.vue";
import favrLandlordNoData from "./cpns/favrLandlordNoData.vue";

import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
// import { useRouter } from "vue-router";

const favorStore = useFavorStore();
favorStore.fetchFavorListAction();
favorStore.fetchFavorGetHistoryyListAction();

// 收藏列表
// const favorList = computed(() => favorStore.favorList)
const { favorList, historylist } = storeToRefs(favorStore);

const titles = ["我的收藏", "浏览历史"];
const activeName = ref("house");
const landlordlist = ref([]); // 房东列表

const active = ref(0);

// 跳转到详情页
// const router = useRouter();
// const itemClick = (item) => {
//   router.push("/detail/" + item.hotleId);
// };
</script>

<style lang="scss" scoped>
.content {
  padding: 10px 20px 55px 20px;
}
</style>
