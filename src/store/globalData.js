import { defineStore } from "pinia";
export const globalData = defineStore("globalData", {
  state: () => {
    return {
      formList: [],
      formConfigVisible: false,
      currentFormConfigByPinia: {},
      switchStyle: {},
    };
  },
  actions: {},
});
