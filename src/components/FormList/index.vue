<template>
  <div class="wrapper">
    <div class="from">
      <drag @formConfig="getCurrentFormConfig"></drag>
      <el-button @click="commit(baseForm)">提交表单</el-button>
      <el-button @click="ApplicationForm">应用表单</el-button>
    </div>
    <div class="config">
      <el-dialog
        :show-close="false"
        v-model="allData.formConfigVisible"
        title="配置项"
      >
        <FormConfig :currentForm="currentFormConfig"></FormConfig>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import { setFormConfig, selectConfig, getRules } from "./index";
import { globalData } from "../../store/globalData";
const baseForm = ref(null);
const labelPosition = ref("top");
const formLabelAlign = reactive({});
const selectOption = ref("");
const allData = globalData();

let currentFormConfig = ref(null);
const getCurrentFormConfig = (e) => {
  currentFormConfig.value = e;
  console.log("getCurrentFormConfig", e);
};
const ApplicationForm = () => {
  console.log("allData应用", allData.formList);
};

const shortcuts = [
  {
    text: "今天",
    value: new Date(),
  },
  {
    text: "昨天",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "一周前",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

const commit = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();

  console.log(formLabelAlign);
};
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  width: 100vw;
  justify-content: space-around;
  .from {
    width: 60vw;
  }
}
</style>
