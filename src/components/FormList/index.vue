<template>
  <div class="wrapper">
    <div class="from">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        ref="baseForm"
        :rules="rules"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item :label="'选择请假类型'">
          <el-select
            v-model="selectOption"
            class="m-2"
            :placeholder="'选择请假类型'"
            size="large"
            @change="selectChange"
          >
            <el-option
              v-for="item in selectConfig"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          @click="showFormItem(item.type, item)"
          v-if="selectOption !== ''"
          :prop="item.name"
          :label="item.title"
          v-for="item in setFormConfig[selectOption]"
          :key="item.name"
        >
          <!-- 时间选择器 -->
          <el-date-picker
            v-if="item.type === 'DATE_TIME'"
            v-model="formLabelAlign[item.name]"
            :type="item.defultProps.type"
            :format="item.defultProps.format"
            :placeholder="item.prompt_msg"
            :size="item.defultProps.size"
            :disabled-date="item.defultProps.disabledDate"
            :shortcuts="item.defultProps.shortcutOpt ? shortcuts : []"
            :range-separator="item.defultProps.rangeSeparator"
            :start-placeholder="item.defultProps.startPlaceholder"
            :end-placeholder="item.defultProps.endPlaceholder"
            :unlink-panels="item.defultProps.unlinkPanels"
          />
          <!-- 输入框 -->

          <el-input
            v-if="item.type === 'input'"
            v-model="formLabelAlign[item.name]"
            :autosize="item.autosize"
            :type="item.inputType"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.prompt_msg"
            :show-password="item.inputType === 'password' ? true : false"
          >
          </el-input>
          <!-- 单选 -->
          <el-radio-group
            v-if="item.type === 'radio'"
            v-model="formLabelAlign[item.name]"
            :text-color="item.defultProps.textColor"
          >
            <el-radio
              v-for="radioItem in item.defultProps.options"
              :key="radioItem.label"
              :label="radioItem.label"
              :disabled="radioItem.props.disabled"
              :border="radioItem.props.border"
              :size="radioItem.props.size"
              >{{ radioItem.value }}</el-radio
            >
          </el-radio-group>
          <!-- 评分 -->

          <el-rate
            v-if="item.type === 'rate'"
            v-model="formLabelAlign[item.name]"
            :colors="item.colors"
            :size="item.size"
            :allow-half="item.allowHalf"
            :show-text="item.showText"
            :texts="item.texts"
            :max="item.max"
            :low-threshold="item.lowThreshold"
          />
          <!-- 数字输入框 -->
          <el-input-number
            v-if="item.type === 'numberInput'"
            v-model="formLabelAlign[item.name]"
            :min="item.defultProps.min"
            :max="item.defultProps.max"
            :step="item.defultProps.step"
            :precision="item.defultProps.precision"
            :controls-position="item.defultProps.position"
          />
          <!-- 选择器 -->
          <el-select
            v-if="item.type === 'select'"
            v-model="formLabelAlign[item.name]"
            :placeholder="item.prompt_msg"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :multiple="item.multiple"
            :collapse-tags="item.collapseTags"
            :collapse-tags-tooltip="item.collapseTagsTooltip"
          >
            <el-option
              v-for="selectItem in item.defultProps.options"
              :key="selectItem.value"
              :label="selectItem.label"
              :value="selectItem.value"
              :disabled="selectItem.disabled"
            />
          </el-select>
          <el-slider
            v-if="item.type === 'slider'"
            :step="item.defultProps.step"
            :show-input="item.defultProps.showInput"
            :show-stops="item.defultProps.showStops"
            :range="item.defultProps.range"
            :debounce="item.defultProps.debounce"
            :placement="item.defultProps.placement"
            :marks="item.defultProps.marks"
            v-model="formLabelAlign[item.name]"
          />
        </el-form-item>
      </el-form>
      <el-button @click="commit(baseForm)">提交表单</el-button>
    </div>
    <div class="config">
      <FormConfig :currentForm="currentFormConfig"></FormConfig>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import { setFormConfig, selectConfig, getRules } from "./index";
const baseForm = ref(null);
const labelPosition = ref("top");
const formLabelAlign = reactive({});
const selectOption = ref("");
let rules = reactive({});
const selectChange = () => {
  console.log(getRules(selectOption.value));
  rules = getRules(selectOption.value);
};
let currentFormConfig = ref(null);
const showFormItem = (e, configItems) => {
  console.log(e, configItems);
  currentFormConfig.value = configItems;
  console.log("currentFormConfig", currentFormConfig.value);
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
  width: 50vw;
  justify-content: space-around;
}
</style>
