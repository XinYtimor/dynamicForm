<template>
  <div class="config-wrapper">
    <h1>配置项</h1>
    <el-form :model="configForm" label-width="120px" v-if="configState">
      <el-form-item
        v-for="item in configList"
        :key="item.label"
        :label="item.label"
      >
        <el-input
          :disabled="item.label === 'type' || item.label === 'id'"
          v-if="typeof item.value === 'string' || item.label === 'id'"
          v-model="item.value"
        />
        <el-input
          v-if="
            Array.isArray(item.value) &&
            item.label !== 'options' &&
            item.label !== 'radioOptions' &&
            item.label !== 'checkboxOpt' &&
            item.label !== 'rule'
          "
          v-model="item.value"
        />

        <div v-if="item.label === 'rule'" v-for="ruleItem in item.value">
          {{ ruleItem }}
        </div>
        <div v-if="item.label === 'options'" class="optConfig">
          <div v-for="optItem in item.value" class="optItem">
            <div>
              <span>label</span>
              <el-input v-model="optItem.label" />
            </div>
            <div><span>value</span> <el-input v-model="optItem.value" /></div>
            <div>
              <span>disabled </span>
              <el-switch
                v-model="optItem.disabled"
                size="small"
                active-text="true"
                inactive-text="false"
              />
            </div>
          </div>

          <el-button
            @click="
              item.value.push({
                label: 'label',
                value: 'value',
                disabled: false,
              })
            "
            >新增</el-button
          >
        </div>
        <div v-if="item.label === 'cascaderOpt'" class="optConfig">
          {{ item.value }}
          <treelist :optList="item.value"></treelist>
        </div>
        <div v-if="item.label === 'radioOptions'" class="optConfig">
          <div v-for="optItem in item.value" class="optItem">
            <div>
              <span>label</span>
              <el-input v-model="optItem.label" />
            </div>
            <div><span>value</span> <el-input v-model="optItem.value" /></div>
            <div>
              <span>disabled </span>
              <el-switch
                v-model="optItem.props.disabled"
                size="small"
                active-text="true"
                inactive-text="false"
              />
            </div>
            <div>
              <span>border</span>
              <el-switch
                v-model="optItem.props.border"
                size="small"
                active-text="true"
                inactive-text="false"
              />
            </div>
            <div>
              <span>size</span>
              <el-radio-group v-model="optItem.props.size" class="ml-4">
                <el-radio label="large" size="small">large</el-radio>
                <el-radio label="default" size="small">default</el-radio>
                <el-radio label="small" size="small">small</el-radio>
              </el-radio-group>
            </div>
            <div>
              <span>textColor</span>
              <el-color-picker v-model="optItem.props.textColor" />
            </div>
          </div>

          <el-button
            @click="
              item.value.push({
                label: 'label',
                value: 'value',
                props: {
                  disabled: false,
                  border: false,
                  size: 'large',
                  textColor: '#e94242',
                },
              })
            "
            >新增</el-button
          >
        </div>
        <div v-if="item.label === 'dragOpt'" class="optConfig">
          <div class="optItem">
            <span>isShow</span>
            <el-switch
              v-model="item.value.isShow"
              size="small"
              active-text="true"
              inactive-text="false"
            />
          </div>
          <div class="optItem">
            <span>text</span>
            <el-input v-model="item.value.text"></el-input>
          </div>
        </div>
        <div v-if="item.label === 'ClickOpt'" class="optConfig">
          <div class="optItem">
            <span>isShow</span>
            <el-switch
              v-model="item.value.isShow"
              size="small"
              active-text="true"
              inactive-text="false"
            />
          </div>
          <div class="optItem">
            <span>text</span>
            <el-input v-model="item.value.text"></el-input>
          </div>
          <div class="optItem">
            <span>type</span>
            <el-radio-group v-model="item.value.type">
              <el-radio :label="'primary'">primary</el-radio>
              <el-radio :label="'success'">success</el-radio>
              <el-radio :label="'info'">Info</el-radio>
              <el-radio :label="'warning'">Warning</el-radio>
              <el-radio :label="'danger'">Danger</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div v-if="item.label === 'checkboxOpt'" class="optConfig">
          <div v-for="optItem in item.value" class="optItem">
            <div class="opt">
              <span>label</span>
              <el-input v-model="optItem.label" />
            </div>
            <div class="opt">
              <span>disabled</span>
              <el-switch
                v-model="optItem.disabled"
                size="small"
                active-text="true"
                inactive-text="false"
              />
            </div>
            <div class="opt">
              <span>border</span>
              <el-switch
                v-model="optItem.border"
                size="small"
                active-text="true"
                inactive-text="false"
              />
            </div>
          </div>
          <el-button
            @click="
              item.value.push({
                label: 'label',
                disabled: false,
                border: false,
              })
            "
            >新增</el-button
          >
        </div>

        <div v-if="item.label === 'expandTrigger'">
          <el-switch
            v-model="item.value"
            size="small"
            active-text="click"
            inactive-text="hover"
          />
        </div>
        <div v-if="item.label === 'checkboxType'">
          <el-switch
            v-model="item.value"
            size="small"
            active-text="button"
            inactive-text="default"
          />
        </div>
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
          v-if="
            typeof item.value === 'boolean' &&
            item.label !== 'expandTrigger' &&
            item.label !== 'checkboxType'
          "
          v-model="item.value"
          size="small"
          active-text="true"
          inactive-text="false"
        />
        <el-input-number
          v-if="typeof item.value === 'number' && item.label !== 'id'"
          v-model="item.value"
          :min="0"
        />
        <el-color-picker
          v-if="item.label === 'colors'"
          v-for="(color, index) in item.value"
          v-model="item.value[index]"
          show-alpha
        />
        <el-color-picker
          v-if="item.label === 'onColor' || item.label === 'offColor'"
          v-model="item.value"
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
              <el-cascader
                v-if="confirmConfig.type === 'cascader'"
                v-model="confirmConfig[confirmConfig.name]"
                :placeholder="confirmConfig.prompt_msg"
                :options="confirmConfig.cascaderOpt"
                :expandTrigger="confirmConfig.expandTrigger ? 'hover' : 'click'"
                :multiple="confirmConfig.multiple"
                :separator="confirmConfig.separator"
                :filterable="confirmConfig.filterable"
                :tag-type="confirmConfig.tagType"
              >
                <template #default="{ node, data }">
                  <span>{{ data.label }}</span>
                  <span v-if="!node.isLeaf && confirmConfig.isShowNum">
                    ({{ data.children.length }})
                  </span>
                </template>
              </el-cascader>

              <el-upload
                v-if="confirmConfig.type === 'upload'"
                v-model:file-list="confirmConfig.fileList"
                class="upload-demo"
                :drag="confirmConfig.dragOpt.isShow"
                :action="confirmConfig.action"
                :multiple="confirmConfig.multiple"
                :limit="confirmConfig.limit"
              >
                <el-icon
                  v-if="confirmConfig.dragOpt.isShow"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>
                <div
                  v-if="confirmConfig.dragOpt.isShow"
                  class="el-upload__text"
                >
                  {{ confirmConfig.dragOpt.text }}
                </div>
                <el-button
                  :type="confirmConfig.ClickOpt.type"
                  v-if="confirmConfig.ClickOpt.isShow"
                  >{{ confirmConfig.ClickOpt.text }}</el-button
                >
                <template #tip>
                  <div class="el-upload__tip">
                    {{ confirmConfig.tip }}
                  </div>
                </template>
              </el-upload>
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
              <el-checkbox-group
                v-if="confirmConfig.type === 'checkbox'"
                v-model="confirmConfig[confirmConfig.name]"
                :min="confirmConfig.min"
                :max="confirmConfig.max"
              >
                <el-checkbox
                  v-if="!confirmConfig.checkboxType"
                  v-for="item in confirmConfig.checkboxOpt"
                  :key="item.label"
                  :label="item.label"
                  :disabled="item.disabled"
                  :border="item.border"
                ></el-checkbox>
                <el-checkbox-button
                  v-if="confirmConfig.checkboxType"
                  v-for="item in confirmConfig.checkboxOpt"
                  :key="item.label"
                  :label="item.label"
                  :disabled="item.disabled"
                  :border="item.border"
                  >{{ item.label }}
                </el-checkbox-button>
              </el-checkbox-group>

              <el-select
                v-if="confirmConfig.type === 'select'"
                v-model="confirmConfig[confirmConfig.name]"
                :placeholder="confirmConfig.prompt_msg"
                :disabled="confirmConfig.disabled"
                :clearable="confirmConfig.clearable"
                :multiple="confirmConfig.multiple"
                :collapse-tags="confirmConfig.collapseTags"
                :collapse-tags-tooltip="confirmConfig.collapseTagsTooltip"
              >
                <el-option
                  v-for="selectItem in confirmConfig.options"
                  :key="selectItem.value"
                  :label="selectItem.label"
                  :value="selectItem.value"
                  :disabled="selectItem.disabled"
                />
              </el-select>

              <el-radio-group
                v-if="confirmConfig.type === 'radio'"
                v-model="confirmConfig[confirmConfig.name]"
                :text-color="confirmConfig.textColor"
              >
                <el-radio
                  v-for="radioItem in confirmConfig.radioOptions"
                  :key="radioItem.label"
                  :label="radioItem.label"
                  :disabled="radioItem.props.disabled"
                  :border="radioItem.props.border"
                  :size="radioItem.props.size"
                  >{{ radioItem.value }}</el-radio
                >
              </el-radio-group>
              <el-switch
                v-if="confirmConfig.type === 'switch'"
                v-model="confirmConfig[confirmConfig.name]"
                :size="confirmConfig.size"
                :style="allData.switchStyle[confirmConfig.id]"
                :inline-prompt="confirmConfig.inlinePrompt"
                :active-text="confirmConfig.activeText"
                :inactive-text="confirmConfig.inactiveText"
              />
              <el-upload
                v-if="confirmConfig.type === 'upload'"
                v-model:file-list="confirmConfig.fileList"
                class="upload-demo"
                :drag="confirmConfig.dragOpt.isShow"
                :action="confirmConfig.action"
                :multiple="confirmConfig.multiple"
                :limit="confirmConfig.limit"
              >
                <el-icon
                  v-if="confirmConfig.dragOpt.isShow"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>
                <div
                  v-if="confirmConfig.dragOpt.isShow"
                  class="el-upload__text"
                >
                  {{ confirmConfig.dragOpt.text }}
                </div>
                <el-button
                  :type="confirmConfig.ClickOpt.type"
                  v-if="confirmConfig.ClickOpt.isShow"
                  >{{ confirmConfig.ClickOpt.text }}</el-button
                >
                <template #tip>
                  <div class="el-upload__tip">
                    {{ confirmConfig.tip }}
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="config-text">
          {{ confirmConfig }}
        </div>
      </div>
      <el-button @click="useConfig">应用</el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, watch, toRaw, computed } from "vue";
import { typeTest, getObjKeys } from "@/utils/utils";
import { setFormConfig } from "../FormList/index";
import { globalData } from "../../store/globalData";
import { rules } from "../FormList/rules";
import { Plus, UploadFilled } from "@element-plus/icons-vue";
const dialogTableVisible = ref(false);
const allData = globalData();
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
};
const determine = (e) => {
  console.log("currentForm", toRaw(props.currentForm));
  ObjectToArr(toRaw(props.currentForm));
  console.log("当前配置", e);
};

const useConfig = () => {
  allData.formConfigVisible = false;
  dialogTableVisible.value = false;
  console.log("应用", confirmConfig.value);
  console.log("formList", allData.formList);
  searchConfigById(confirmConfig.value);
};

const searchConfigById = (confirmConfig) => {
  allData.formList.forEach((item, index) => {
    if (item.id === confirmConfig.id) {
      item = confirmConfig;
      allData.formList.splice(index, 1, confirmConfig);
      console.log("item", item);
      console.log("修改后的配置", allData.formList);
    }
  });
};

let rulesPreviewList = ref({});
const preview = () => {
  dialogTableVisible.value = true;

  confirmConfig.value = viewToConfig(configList.value);
  // confirmConfig.value.rule = RuleOptToRule(confirmConfig.value.rule);
  confirmConfig.value.rule = RuleOptToRule(confirmConfig.value.ruleName);
  rulesPreviewList.value[confirmConfig.value.name] = confirmConfig.value.rule;
  console.log("rulesPreviewList", rulesPreviewList.value);
  console.log("confirmConfig", confirmConfig.value);
  //开关的颜色控制
  if (confirmConfig.value.type === "switch") {
    allData.switchStyle[
      confirmConfig.value.id
    ] = `--el-switch-on-color:${confirmConfig.value.onColor};--el-switch-off-color:${confirmConfig.value.offColor}`;
  }
  console.log("switchStyleByPreview", allData.switchStyle);
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
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);
</script>

<style scoped lang="less">
.optConfig {
  display: flex;
  flex-direction: column;
  .optItem {
    display: flex;
    width: 40vw;
    flex-direction: column;
    :deep(.el-radio-group) {
      display: flex;
      flex-wrap: wrap;
    }
    .opt {
      display: flex;
      flex-direction: column;
    }
  }
}
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
