import dayjs from "dayjs";

// 传入日期转为月日
export function formatMonthDay(date, formatStr = "MM月DD日") {
  return dayjs(date).format(formatStr);
}

// 传入两个时间，转换为多少天
export function getDiffDate(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day");
}
