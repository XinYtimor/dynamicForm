<template>
  <div class="wrapper">
    <h1>配置项</h1>
    <el-form :model="configForm" label-width="120px" v-if="configState">
      <el-form-item
        v-for="(item, index) in configList"
        :key="item.label"
        :label="item.label"
      >
        <el-input
          :disabled="item.label === 'type'"
          v-model="item.value"
          placeholder="Please input"
        />

        <!-- <el-input v-model="labelLists[index]" placeholder="Please input" /> -->
      </el-form-item>
    </el-form>
    <el-button @click="determine(configList)">确定</el-button>
    <el-button @click="preview">预览</el-button>
    <el-button @click="exportConfig">导出</el-button>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { typeTest, getObjKeys } from "@/utils/utils";
const props = defineProps({
  type: String,
});
let configList = ref([]);
let configForm = reactive({});
const configState = ref(false);
let labelLists = reactive({});

const showConfig = (e) => {
  configState.value = true;
  switch (e) {
    case "rate":
      configList.value = [
        {
          label: "name",
          value: "score",
        },
        {
          label: "type",
          value: "rate",
        },
        {
          label: "title",
          value: "评分",
        },
        {
          label: "prompt_msg",
          value: "",
        },
        {
          label: "colors",
          value: ["#99A9BF", "#F7BA2A", "#FF9900"],
        },
        {
          label: "size",
          value: "small",
        },
        {
          label: "allowHalf",
          value: "true",
        },
        {
          label: "texts",
          value: ["oops", "disappointed", "normal", "good", "great"],
        },
        {
          label: "showText",
          value: "true",
        },
        {
          label: "max",
          value: "5",
        },
        {
          label: "lowThreshold",
          value: "2",
        },
        {
          label: "val",
          value: "null",
        },
      ];

      // console.log("getObjKeys", getObjKeys(configList));
      // setLabel(configList);
      // configLists = configList;
      break;
    default:
      configList = null;
      break;
  }
};
const determine = (e) => {
  console.log("当前配置", e);
};
const setLabel = (list) => {
  let labelList = {};
  getObjKeys(list).forEach((item, index) => {
    switch (item) {
      case "name":
        labelList.name = {
          label: "数据对象",
          disabled: false,
        };
        break;

      case "type":
        labelList.type = {
          label: "类型",
          disabled: true,
        };
        break;
      // case "title":
      //   labelList[index] = {
      //     label: "标题",
      //     disabled: false,
      //   };
      //   break;
      // case "max":
      //   labelList[index] = {
      //     label: "最大值",
      //     disabled: false,
      //   };
      //   break;
      // case "prompt_msg":
      //   labelList[index] = {
      //     label: "占位文本",
      //     disabled: false,
      //   };
      //   break;
      // case "colors":
      //   labelList[index] = {
      //     label: "颜色",
      //     disabled: false,
      //   };
      //   break;
      // case "size":
      //   labelList[index] = {
      //     label: "尺寸",
      //     disabled: false,
      //   };
      //   break;
      // case "allowHalf":
      //   labelList[index] = {
      //     label: "允许半颗星",
      //     disabled: false,
      //   };
      //   break;
      // case "texts":
      //   labelList[index] = {
      //     label: "辅助文字",
      //     disabled: false,
      //   };
      //   break;
      // case "showText":
      //   labelList[index] = {
      //     label: "显示辅助文字",
      //     disabled: false,
      //   };
      //   break;
      // case "lowThreshold":
      //   labelList[index] = {
      //     label: "低分和中等分数的界限值",
      //     disabled: false,
      //   };
      //   break;
      // case "val":
      //   labelList[index] = {
      //     label: "默认值",
      //     disabled: false,
      //   };
      //   break;
    }
  });
  // labelLists.value = labelList;
  labelLists = labelList;
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
