<template>
  <div class="wrapper">
    <h1>配置项</h1>
    <el-form :model="configForm" label-width="120px" v-if="configState">
      <el-form-item
        v-for="(item, index) in configList"
        :label="labelLists[index]"
      >
        <el-input v-model="configList[index]" placeholder="Please input" />
        <!-- <el-input v-model="labelLists[index]" placeholder="Please input" /> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { typeTest, getObjKeys } from "@/utils/utils";
const props = defineProps({
  type: String,
});
let configList = reactive({});
let configForm = reactive({});
const configState = ref(false);
const labelLists = ref([]);

const showConfig = (e) => {
  configState.value = true;
  switch (e) {
    case "rate":
      configList = {
        name: "score",
        type: "rate",
        title: "评分",
        prompt_msg: "",
        // defultProps: {
        colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
        size: "small",
        allowHalf: true,
        texts: ["oops", "disappointed", "normal", "good", "great"],
        showText: true,
        max: 5,
        lowThreshold: 2,
        // },
        val: null,
      };
      // console.log("getObjKeys", getObjKeys(configList));
      setLabel(configList);
      break;
    default:
      configList = null;
      break;
  }
};

const setLabel = (list) => {
  let labelList = [];
  getObjKeys(list).forEach((item, index) => {
    switch (item) {
      case "name":
        labelList[index] = {
          label: "数据对象",
          disabled: false,
        };
        break;

      case "type":
        labelList[index] = {
          label: "类型",
          disabled: true,
        };
        break;
      case "title":
        labelList[index] = {
          label: "标题",
          disabled: false,
        };
        break;
      case "max":
        labelList[index] = {
          label: "最大值",
          disabled: false,
        };
        break;
      case "prompt_msg":
        labelList[index] = {
          label: "占位文本",
          disabled: false,
        };
        break;
      case "colors":
        labelList[index] = {
          label: "颜色",
          disabled: false,
        };
        break;
      case "size":
        labelList[index] = {
          label: "尺寸",
          disabled: false,
        };
        break;
      case "allowHalf":
        labelList[index] = {
          label: "允许半颗星",
          disabled: false,
        };
        break;
      case "texts":
        labelList[index] = {
          label: "辅助文字",
          disabled: false,
        };
        break;
      case "showText":
        labelList[index] = {
          label: "显示辅助文字",
          disabled: false,
        };
        break;
      case "lowThreshold":
        labelList[index] = {
          label: "低分和中等分数的界限值",
          disabled: false,
        };
        break;
      case "val":
        labelList[index] = {
          label: "默认值",
          disabled: false,
        };
        break;
    }
  });
  labelLists.value = labelList;
  console.log("labelList", labelList);
};
watch(
  () => props.type,
  (newValue) => {
    showConfig(newValue);
  },
  {
    immediate: false, // 立即执行
    deep: true, // 深度监听
  }
);
</script>

<style scoped lang="less"></style>
