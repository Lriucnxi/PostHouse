<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <div class="text">我的位置</div>
        <img src="@/assets/images/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div
      class="section date-range bottom-gray-line"
      @click="showCalendar = true"
    >
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>

        <div class="stay">共{{ stayDay }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      :formatter="formatter"
      @confirm="onConfirm"
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门推荐 -->
    <div class="section hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            backgroundColor: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <button class="btn" @click="searchBtnClick">开始搜索</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

import useHomeStore from "@/stores/modules/home";
import useCityStore from "@/stores/modules/city";
import useMainStore from "@/stores/modules/main";

import { formatMonthDay, getDiffDate } from "@/utils/format_date";

const router = useRouter();

// 热门推荐数据
const homeStore = useHomeStore();
homeStore.fetchHotSuggestsAction();
const { hotSuggests } = storeToRefs(homeStore);

// 城市数据
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 监听当前位置/所选城市的点击
const cityClick = () => {
  router.push("/city");
};

// 监听我的位置的点击事件
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败！", err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
};

// 日期范围处理
// const nowDate = new Date(); // 当前时间
// const newDate = new Date().setDate(nowDate.getDate() + 1); // 结束时间
const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);

// const startDateStr = ref(formatMonthDay(nowDate)); // 当前时间格式化处理
// const endDateStr = ref(formatMonthDay(newDate)); // 结束时间格式化处理
const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));

// const stayDay = ref(getDiffDate(nowDate, newDate));
const stayDay = ref(getDiffDate(startDate.value, endDate.value));
const showCalendar = ref(false); // 是否显示日历

// 自定义日期文案
const formatter = (day) => {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }

  return day;
};

// 确认
const onConfirm = (value) => {
  // 设置日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  // startDate.value = formatMonthDay(selectStartDate);
  // endDate.value = formatMonthDay(selectEndDate);
  mainStore.startDate = selectStartDate;
  mainStore.endDate = selectEndDate;
  stayDay.value = getDiffDate(selectStartDate, selectEndDate);
  // 隐藏日历
  showCalendar.value = false;
};

// 开始搜索 点击事件
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: formatMonthDay(startDate.value, "MM.DD"),
      endDate: formatMonthDay(endDate.value, "MM.DD"),
      address: currentCity.value.cityName,
    },
  });
};
</script>

<style lang="scss" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
  }
  .position {
    width: 74px;
    display: flex;
    align-items: center;
    .text {
      font-size: 12px;
      position: relative;
      top: 2px;
    }
    img {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
.price-counter {
  .start {
    border-right: 1px solid #f8f9f9;
  }
}
.hot-suggest {
  margin: 10px 0;
  height: auto;
  .item {
    padding: 4px 8px;
    border-radius: 14px;
    margin: 3px;
    font-size: 12px;
  }
}
.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(
      --theme-linear-gradient,
      linear-gradient(90deg, #fa8c1d, #fcaf3f)
    );
  }
}
</style>
