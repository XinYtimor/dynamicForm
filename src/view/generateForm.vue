<template>
  <el-form ref="formRef" :model="customFormList" label-width="120px">
    <el-form-item
      :label="element.title"
      v-for="element in allData.formList"
      :key="element.id"
    >
      <!-- 输入框 -->
      <el-input
        v-if="element.type === 'input'"
        v-model="customFormList[element.name]"
        :autosize="element.autosize"
        :type="element.inputType"
        :disabled="element.disabled"
        :clearable="element.clearable"
        :placeholder="element.prompt_msg"
        :maxlength="element.maxlength"
        :minlength="element.minlength"
        :show-word-limit="element.showWordLimit"
        :readonly="element.readonly"
        :rule="element.rule"
        :show-password="element.inputType === 'password' ? true : false"
      >
      </el-input>
      <!-- 数字输入框 -->
      <el-input-number
        v-if="element.type === 'numberInput'"
        v-model="customFormList[element.name]"
        :min="element.min"
        :max="element.max"
        :step="element.step"
        :precision="element.precision"
        :controls-position="element.position"
      />
      <!-- 评分 -->
      <el-rate
        v-if="element.type === 'rate'"
        v-model="customFormList[element.name]"
        :colors="element.colors"
        :size="element.size"
        :allow-half="element.allowHalf"
        :show-text="element.showText"
        :texts="element.texts"
        :max="element.max"
        :low-threshold="element.lowThreshold"
      />
      <!-- 滑块 -->
      <el-slider
        v-if="element.type === 'slider'"
        :step="element.step"
        :show-input="element.showInput"
        :show-stops="element.showStops"
        :range="element.range"
        :debounce="element.debounce"
        :placement="element.placement"
        :marks="element.marks"
        v-model="customFormList[element.name]"
      />
      <!-- 选择器 -->
      <el-select
        v-if="element.type === 'select'"
        v-model="customFormList[element.name]"
        :placeholder="element.prompt_msg"
        :disabled="element.disabled"
        :clearable="element.clearable"
        :multiple="element.multiple"
        :collapse-tags="element.collapseTags"
        :collapse-tags-tooltip="element.collapseTagsTooltip"
      >
        <el-option
          v-for="selectItem in element.options"
          :key="selectItem.value"
          :label="selectItem.label"
          :value="selectItem.value"
          :disabled="selectItem.disabled"
        />
      </el-select>
      <!-- 单选框 -->
      <el-radio-group
        v-if="element.type === 'radio'"
        v-model="customFormList[element.name]"
        :text-color="element.textColor"
      >
        <el-radio
          v-for="radioItem in element.radioOptions"
          :key="radioItem.label"
          :label="radioItem.label"
          :disabled="radioItem.props.disabled"
          :border="radioItem.props.border"
          :size="radioItem.props.size"
          >{{ radioItem.value }}</el-radio
        >
      </el-radio-group>
      <!-- 日期选择器 -->
      <el-date-picker
        v-if="element.type === 'DATE_TIME'"
        v-model="customFormList[element.name]"
        :type="element.type"
        :format="element.format"
        :placeholder="element.prompt_msg"
        :size="element.size"
        :disabled-date="element.disabledDate"
        :shortcuts="element.shortcutOpt ? shortcuts : []"
        :range-separator="element.rangeSeparator"
        :start-placeholder="element.startPlaceholder"
        :end-placeholder="element.endPlaceholder"
        :unlink-panels="element.unlinkPanels"
      />
      <!-- 级联选择器 -->
      <el-cascader
        v-if="element.type === 'cascader'"
        v-model="customFormList[element.name]"
        :placeholder="element.prompt_msg"
        :options="element.cascaderOpt"
        :expandTrigger="element.expandTrigger ? 'hover' : 'click'"
        :multiple="element.multiple"
        :separator="element.separator"
        :tag-type="element.tagType"
      >
        <template #default="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf && element.isShowNum">
            ({{ data.children.length }})
          </span>
        </template>
      </el-cascader>
      <!-- 多选框 -->

      <el-checkbox-group
        v-model="customFormList[element.name]"
        :min="element.min"
        :max="element.max"
      >
        <el-checkbox
          v-if="!element.checkboxType"
          v-for="item in element.checkboxOpt"
          :key="item.label"
          :label="item.label"
          :disabled="item.disabled"
          :border="item.border"
        ></el-checkbox>
        <el-checkbox-button
          v-if="element.checkboxType"
          v-for="item in element.checkboxOpt"
          :key="item.label"
          :label="item.label"
          :disabled="item.disabled"
          :border="item.border"
          >{{ item.label }}
        </el-checkbox-button>
      </el-checkbox-group>
      <!-- 开关 -->
      <el-switch
        v-if="element.type === 'switch'"
        v-model="customFormList[element.name]"
        :disabled="element.disabled"
        :size="element.size"
        :width="element.width"
        :style="allData.switchStyle[element.id]"
        :inline-prompt="element.inlinePrompt"
        :active-text="element.activeText"
        :inactive-text="element.inactiveText"
        :loading="element.loading"
      />
      <!-- 上传 -->
      <el-upload
        v-if="element.type === 'upload'"
        v-model:file-list="element.fileList"
        class="upload-demo"
        :drag="element.dragOpt.isShow"
        :action="element.action"
        :multiple="element.multiple"
        :limit="element.limit"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon v-if="element.dragOpt.isShow" class="el-icon--upload"
          ><upload-filled
        /></el-icon>
        <div v-if="element.dragOpt.isShow" class="el-upload__text">
          {{ element.dragOpt.text }}
        </div>
        <el-button
          :type="element.ClickOpt.type"
          v-if="element.ClickOpt.isShow"
          >{{ element.ClickOpt.text }}</el-button
        >
        <template #tip>
          <div class="el-upload__tip">
            {{ element.tip }}
          </div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
</template>

<script setup>
import { reactive, ref } from "vue";
import { globalData } from "../store/globalData";
const allData = globalData();
const customFormList = reactive({
  test: "",
});

const formRef = ref(null);
const submitForm = () => {
  console.log(customFormList);
};
</script>

<style scoped lang="less"></style>
