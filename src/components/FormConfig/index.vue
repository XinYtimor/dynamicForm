<template>
  <div class="config-wrapper">
    <h1>配置项</h1>
    <el-form :model="configForm" label-width="120px" v-if="configState">
      <el-form-item
        v-for="(item, index) in configList"
        :key="item.label"
        :label="item.label"
      >
        <el-input
          :disabled="item.label === 'type'"
          v-if="typeof item.value === 'string'"
          v-model="item.value"
        />
        <el-input v-if="Array.isArray(item.value)" v-model="item.value" />
        <!-- <el-select
          v-if="item.label === 'rule'"
          v-model="item.value"
          multiple
          style="width: 240px"
        >
          <el-option
            v-for="item in ruleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
        <el-select
          v-if="item.label === 'ruleName'"
          v-model="item.value"
          multiple
          style="width: 240px"
        >
          <el-option
            v-for="item in ruleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-switch
          v-if="typeof item.value === 'boolean'"
          v-model="item.value"
          size="small"
          active-text="true"
          inactive-text="false"
        />
        <el-input-number
          v-if="typeof item.value === 'number'"
          v-model="item.value"
          :min="0"
        />
        <el-color-picker
          v-if="item.label === 'colors'"
          v-for="(color, index) in item.value"
          v-model="item.value[index]"
          show-alpha
        />
      </el-form-item>
    </el-form>
    <div class="btn-wrapper">
      <el-button @click="determine(configList)">确定</el-button>
      <el-button @click="preview">预览</el-button>
      <el-button @click="exportConfig">导出</el-button>
    </div>

    <el-dialog v-model="dialogTableVisible" title="预览">
      <div class="dialog-content">
        <div class="preview">
          <el-form
            ref="previewForm"
            :model="confirmConfig"
            :rules="rulesPreviewList"
          >
            <el-form-item
              :label="confirmConfig.title"
              :prop="confirmConfig.name"
            >
              <el-rate
                v-if="confirmConfig.type === 'rate'"
                :colors="confirmConfig.colors"
                :size="confirmConfig.size"
                :allow-half="confirmConfig.allowHalf"
                :show-text="confirmConfig.showText"
                :texts="confirmConfig.texts"
                :max="confirmConfig.max"
                :low-threshold="confirmConfig.lowThreshold"
              />
              <el-input
                v-if="confirmConfig.type === 'input'"
                v-model="confirmConfig[confirmConfig.name]"
                :autosize="confirmConfig.autosize"
                :type="confirmConfig.inputType"
                :disabled="confirmConfig.disabled"
                :clearable="confirmConfig.clearable"
                :placeholder="confirmConfig.prompt_msg"
                :show-password="
                  confirmConfig.inputType === 'password' ? true : false
                "
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="config-text">
          {{ confirmConfig }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, watch, toRaw } from "vue";
import { typeTest, getObjKeys } from "@/utils/utils";
import { rules } from "../FormList/rules";
const dialogTableVisible = ref(false);
const props = defineProps({
  currentForm: Object,
});
const ruleOptions = ref([]);
let configList = ref([]);
let configForm = reactive({});
const configState = ref(false);
let labelLists = reactive({});
let confirmConfig = ref(null);

const ruleToRuleOpt = (rules) => {
  let ruleRes = [];
  Object.keys(rules).forEach((key) => {
    ruleRes.push({ label: key, value: key });
  });
  console.log("ruleRes");
  return ruleRes;
};

const RuleOptToRule = (ruleArr) => {
  let res = [];
  ruleArr.forEach((item) => {
    res.push(rules[item]);
  });
  console.log("actRules", res);
  return res;
};

const showConfig = (e) => {
  configState.value = true;
  configList.value = ObjectToArr(e);
  // switch (e.type) {
  //   case "rate":
  //     configList.value = ObjectToArr(e);
  //     break;
  //   case "input":
  //     configList.value = ObjectToArr(e);
  //     break;
  //   default:
  //     configList = null;
  //     break;
  // }
};
const determine = (e) => {
  console.log("currentForm", toRaw(props.currentForm));
  ObjectToArr(toRaw(props.currentForm));
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
// const rulesPreviewList = reactive({});
let rulesPreviewList = ref({});
const preview = () => {
  dialogTableVisible.value = true;

  confirmConfig.value = viewToConfig(configList.value);
  // confirmConfig.value.rule = RuleOptToRule(confirmConfig.value.rule);
  confirmConfig.value.rule = RuleOptToRule(confirmConfig.value.ruleName);
  rulesPreviewList.value[confirmConfig.value.name] = confirmConfig.value.rule;
  console.log("rulesPreviewList", rulesPreviewList.value);
  console.log("confirmConfig", confirmConfig.value);
};

const viewToConfig = (arr) => {
  let config = {};
  arr.forEach((item) => {
    config[item.label] = item.value;
  });
  console.log("config", config);
  return config;
};

const ObjectToArr = (obj) => {
  let arr = [];
  Object.keys(obj).forEach((key) => {
    arr.push({
      label: key,
      value: obj[key],
    });
  });
  return arr;
};

watch(
  () => props.currentForm,
  (newValue) => {
    console.log("newValue", toRaw(newValue));
    showConfig(toRaw(newValue));
    ruleOptions.value = ruleToRuleOpt(rules);
  },
  {
    immediate: false, // 立即执行
    deep: true, // 深度监听
  }
);
</script>

<style scoped lang="less">
.config-wrapper {
  display: flex;
  flex-direction: column;
  width: 30vw;
}
.dialog-content {
  display: flex;
  flex-direction: row;
  .preview {
    width: 50%;
  }
  .config-text {
    width: 50%;
  }
}
</style>
