import { defineStore } from "pinia";

import { getOrderList } from "@/service";

const useOrderStore = defineStore("order", {
  state: () => ({
    orderList: [],
  }),
  actions: {
    async fetchOrderListAction(type = "all") {
      const res = await getOrderList(type);
      this.orderList = res.data.data.orders || [];
    },
  },
});

export default useOrderStore;
