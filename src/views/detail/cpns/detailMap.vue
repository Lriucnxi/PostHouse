<template>
  <div class="map-area">
    <detailSection :title="`位置周边`" :more-text="'查看更多周边信息'">
      <div class="baidu" ref="mapRef"></div>
    </detailSection>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import detailSection from "@/components/detail-section/detailSection.vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({}),
  },
});

const mapRef = ref();
onMounted(() => {
  // 创建地图实例
  let map = new BMapGL.Map(mapRef.value);
  // 创建点坐标
  let point = new BMapGL.Point(
    props.position.longitude,
    props.position.latitude
  );
  // 初始化地图，设置中心点坐标和地图级别
  map.centerAndZoom(point, 15);
  // 创建标注
  let marker = new BMapGL.Marker(point);
  // 将标注添加到地图中
  map.addOverlay(marker);
  // 添加点击事件
  map.addEventListener("click", function (e) {
    alert("当前所点击位置的经纬度：" + e.latlng.lng + ", " + e.latlng.lat);
    // var mercator = map.lnglatToMercator(e.latlng.lng, e.latlng.lat);
    // alert('点的墨卡托坐标：' + mercator[0] + ', ' + mercator[1]);
  });
});
</script>

<style lang="scss" scoped>
.baidu {
  height: 300px;
}
</style>