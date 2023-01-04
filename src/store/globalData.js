import { defineStore } from "pinia";
export const globalData = defineStore("globalData", {
  state: () => {
    return {
      formList: [
        {
          id: 1,
          name: "Abby",
          sport: "basket",
          title: "输入框",
          prompt_msg: "请输入内容",
          type: "input",
        },
      ],
      formConfigVisible: false,
      currentFormConfigByPinia: {},
    };
  },
  actions: {},
});
