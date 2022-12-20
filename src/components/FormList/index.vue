<template>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
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
      v-if="selectOption !== ''"
      :label="item.title"
      v-for="item in setFormConfig[selectOption]"
      :key="item.name"
    >
      <el-date-picker
        v-if="item.type === 'halfdaydate'"
        v-model="formLabelAlign[item.name]"
        type="datetime"
        :placeholder="item.prompt_msg"
      />
      <el-input
        v-if="item.type === 'leavelength'"
        v-model="formLabelAlign[item.name]"
        :placeholder="item.prompt_msg"
        class="input-with-select"
      >
        <template #append v-if="item.selectOptions">
          <el-select
            v-model="formLabelAlign[item.name].dimension"
            v-for="item in item.selectOptions"
            style="width: 115px"
          >
            <el-option :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-input>
      <el-input
        v-if="item.type === 'multiple'"
        v-model="formLabelAlign[item.name]"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        :placeholder="item.prompt_msg"
      />
    </el-form-item>
  </el-form>
  <el-button @click="commit">提交表单</el-button>
</template>

<script setup>
import { reactive, ref } from "vue";
import { setFormConfig, selectConfig } from "./index";
const labelPosition = ref("top");
const formLabelAlign = reactive({});
const selectOption = ref("");
const selectChange = () => {
  console.log(selectOption.value);
};
const commit = () => {
  console.log(formLabelAlign);
};
</script>

<style scoped lang="less"></style>
