<template>
  <h1>配置表单</h1>
  <div class="drag-wrapper">
    <div class="drag1">
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        item-key="name"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            {{ element.title.value }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="drag2">
      表单

      <draggable
        @change="log"
        v-model="allData.formList"
        tag="el-form"
        group="people"
        item-key="name"
      >
        <template #item="{ element }">
          <el-form-item
            :label="element.title"
            @click="showFormItem(element.type, element)"
            class="configForm"
          >
            <el-button
              class="deleteFormItem"
              @click="deleteFormItem(element.id)"
              >删除</el-button
            >
            <!-- 输入框 -->

            <el-input
              v-if="element.type === 'input'"
              v-model="formLabelAlign[element.name]"
              :autosize="element.autosize"
              :type="element.inputType"
              :disabled="element.disabled"
              :clearable="element.clearable"
              :placeholder="element.prompt_msg"
              :show-password="element.inputType === 'password' ? true : false"
            >
            </el-input>
            <!-- 数字输入框 -->
            <el-input-number
              v-if="element.type === 'numberInput'"
              v-model="formLabelAlign[element.name]"
              :min="element.min"
              :max="element.max"
              :step="element.step"
              :precision="element.precision"
              :controls-position="element.position"
            />
            <!-- 评分 -->
            <el-rate
              v-if="element.type === 'rate'"
              v-model="formLabelAlign[element.name]"
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
              v-model="formLabelAlign[element.name]"
            />
            <!-- 选择器 -->
            <el-select
              v-if="element.type === 'select'"
              v-model="formLabelAlign[element.name]"
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
              v-model="formLabelAlign[element.name]"
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
              v-model="formLabelAlign[element.name]"
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
              v-model="formLabelAlign[element.name]"
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
              v-model="formLabelAlign[element.name]"
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
              v-model="formLabelAlign[element.name]"
              :disabled="element.disabled"
              :size="element.size"
              :style="allData.switchStyle[element.id]"
              :inline-prompt="element.inlinePrompt"
              :active-text="element.activeText"
              :inactive-text="element.inactiveText"
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
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { randomRangeId } from "../../utils/utils";
import { computed, reactive, ref, toRaw, watch } from "vue";
import { globalData } from "../../store/globalData";
import { ElMessage } from "element-plus";
import { Plus, UploadFilled } from "@element-plus/icons-vue";

const allData = globalData();
const labelPosition = ref("top");
const switchStyle = reactive({});

const formLabelAlign = reactive({});
const drag = ref(false);
const list1 = ref([
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "cascader",
    },
    title: {
      desc: "标题",
      value: "级联选择器",
    },
    prompt_msg: {
      desc: "默认内容",
      value: "级联选择器",
    },
    cascaderOpt: {
      desc: "配置项",
      value: [
        {
          value: "value1",
          label: "label1",
          isRoot: true,
          children: [
            {
              value: "value1Child",
              label: "label1Child",

              children: [
                {
                  value: "value1Son",
                  label: "label1Son",
                  children: [
                    {
                      value: "value1SonSon",
                      label: "label1SonSon",
                    },
                  ],
                },
              ],
            },
            {
              value: "value2Child",
              label: "label2Child",
              children: [
                {
                  value: "value2Son",
                  label: "label2Son",
                },
              ],
            },
          ],
        },
      ],
    },
    isShowNum: {
      desc: "isShowNum",
      value: false,
    },
    separator: {
      desc: "separator",
      value: "/",
    },
    tagType: {
      desc: "tagType",
      value: "info",
    },
    filterable: {
      desc: "filterable",
      value: true,
    },
    expandTrigger: {
      desc: "expandTrigger",
      value: false,
    },
    multiple: {
      desc: "multiple",
      value: false,
    },
    rule: {
      desc: "",
      value: [],
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "名称",
      value: "",
    },
    type: {
      desc: "类型",
      value: "input",
    },
    title: {
      desc: "标题",
      value: "输入框",
    },
    prompt_msg: {
      desc: "默认内容",
      value: "请输入内容",
    },
    disabled: {
      desc: "",
      value: false,
    },
    clearable: {
      desc: "",
      value: true,
    },
    autosize: {
      desc: "",
      value: true,
    },
    inputType: {
      desc: "",
      value: false,
    },
    rule: {
      desc: "",
      value: [],
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "upload",
    },
    title: {
      desc: "标题",
      value: "上传",
    },
    fileList: {
      desc: "文件列表",
      value: [],
    },
    action: {
      desc: "请求 URL",
      value: "",
    },
    limit: {
      desc: "允许上传文件的最大数量",
      value: 3,
    },
    dragOpt: {
      desc: "拖拽上传设置",
      value: {
        isShow: false,
        text: "Drop file here or <em>click to upload</em>",
      },
    },
    multiple: {
      desc: "是否支持多选文件",
      value: true,
    },
    ClickOpt: {
      desc: "点击上传设置",
      value: {
        isShow: false,
        type: "primary",
        text: "上传",
      },
    },
    tip: {
      desc: "提示",
      value: "最多只能上传3张图片",
    },
    rule: {
      desc: "rule",
      value: [],
    },
    val: {
      desc: "rule",
      val: null,
    },
  },
  {
    id: {
      desc: "id",
      value: null,
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "switch",
    },
    title: {
      desc: "标题",
      value: "开关",
    },
    prompt_msg: {
      desc: "默认",
      value: "",
    },
    inlinePrompt: {
      desc: "无论图标或文本是否显示在点内，只会呈现文本的第一个字符",
      value: false,
    },
    activeText: {
      desc: "switch 打开时的文字描述",
      value: "true",
    },
    inactiveText: {
      desc: "switch 的状态为 off 时的文字描述",
      value: "false",
    },
    onColor: {
      desc: "当在 on 状态时的背景颜色",
      value: "#13ce66",
    },
    offColor: {
      desc: "当在 off 状态时的背景颜色",
      value: "#ff4949",
    },
    disabled: {
      desc: "是否禁用",
      value: false,
    },
    rule: {
      desc: "",
      value: [],
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: "",
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "checkbox",
    },
    checkboxType: {
      desc: "选框类型",
      value: false,
    },
    title: {
      desc: "标题",
      value: "多选框",
    },
    prompt_msg: {
      desc: "",
      value: "",
    },
    min: {
      desc: "可被勾选的 checkbox 的最小数量",
      value: 1,
    },
    max: {
      desc: "可被勾选的 checkbox 的最大数量",
      value: 2,
    },
    checkboxOpt: {
      desc: "选框设置",
      value: [
        {
          label: "Option A",
          disabled: false,
          border: false,
        },
      ],
    },
    rule: {
      desc: "",
      value: [],
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: "",
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "numberInput",
    },
    title: {
      desc: "标题",
      value: "数字输入框",
    },
    prompt_msg: {
      desc: "默认内容",
      value: "",
    },
    min: {
      desc: "设置计数器允许的最小值",
      value: 1,
    },
    rule: {
      desc: "",
      value: [],
    },
    max: {
      desc: "设置计数器允许的最大值",
      value: 100,
    },
    step: {
      desc: "计数器步长",
      value: 2,
    },
    precision: {
      desc: "数值精度",
      value: 2,
    },
    position: {
      desc: "控制按钮位置",
      value: "right",
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "rate",
    },
    title: {
      desc: "标题",
      value: "评分",
    },
    prompt_msg: {
      desc: "默认内容",
      value: "",
    },
    colors: {
      desc: "icon 的颜色",
      value: ["#99A9BF", "#F7BA2A", "#FF9900"],
    },
    size: {
      desc: "尺寸",
      value: "small",
    },
    rule: {
      desc: "",
      value: [],
    },
    allowHalf: {
      desc: "是否允许半选",
      value: true,
    },
    texts: {
      desc: "辅助文字数组",
      value: ["oops", "disappointed", "normal", "good", "great"],
    },
    showText: {
      desc: "是否显示辅助文字",
      value: true,
    },
    max: {
      desc: "最大分值",
      value: 5,
    },
    lowThreshold: {
      desc: "低分和中等分数的界限值",
      value: 2,
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "slider",
    },
    title: {
      desc: "标题",
      value: "滑块",
    },
    rule: {
      desc: "",
      value: [],
    },
    prompt_msg: {
      desc: "默认内容",
      value: "请选择",
    },
    step: {
      desc: "步长",
      value: 5,
    },
    showInput: {
      desc: "是否显示输入框",
      value: false,
    },
    showStops: {
      desc: "是否显示间断点",
      value: true,
    },
    range: {
      desc: "是否开启选择范围",
      value: true,
    },
    debounce: {
      desc: "输入时的去抖延迟",
      value: 500,
    },
    placement: {
      desc: "Tooltip 出现的位置",
      value: "top", //top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    },
    marks: {
      desc: "标记",
      value: {
        0: "0°C",
        8: "8°C",
        37: "37°C",
        50: {
          style: {
            color: "#1989FA",
          },
          label: "50%",
        },
      },
    },
    clearable: {
      desc: "Tooltip 出现的位置",
      value: true,
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "名称",
      value: "",
    },
    type: {
      desc: "类型",
      value: "select",
    },
    title: {
      desc: "标题",
      value: "选择器",
    },
    prompt_msg: {
      desc: "默认内容",
      value: "请选择",
    },
    slot: {
      desc: "slot",
      value: "",
    },
    rule: {
      desc: "",
      value: [],
    },
    clearable: {
      desc: "是否可以清空选项",
      value: true,
    },
    disabled: {
      desc: "是否禁用",
      value: false,
    },
    multiple: {
      desc: "是否多选",
      value: true,
    },
    collapseTags: {
      desc: "多选时是否将选中值按文字的形式展示",
      value: true,
    },
    collapseTagsTooltip: {
      desc: "当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签",
      value: true,
    },
    options: {
      desc: "配置项",
      value: [
        {
          value: "Option1",
          label: "Option1",
          disabled: true,
        },
        {
          value: "Option2",
          label: "Option2",
          disabled: true,
        },
      ],
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "radio",
    },
    rule: {
      desc: "rule",
      value: [],
    },
    title: {
      desc: "标题",
      value: "单项选择",
    },
    prompt_msg: {
      desc: "默认内容",
      value: "",
    },
    fill: {
      desc: "按钮形式的 Radio 激活时的填充色和边框色",
      value: "#000000",
    },
    textColor: {
      desc: "按钮形式的 Radio 激活时的文本颜色",
      value: "#e94242",
    },
    radioOptions: {
      desc: "配置项",
      value: [
        {
          label: "1",
          value: "opt1",
          props: {
            disabled: true,
            size: "large", //large / default /small
            textColor: "#e94242", //按钮形式的 Radio 激活时的文本颜色
            border: true,
          },
        },
        {
          label: "2",
          value: "opt2",
          props: {
            disabled: true,
            border: true,
            size: "large", //large / default /small
            textColor: "#e94242", //按钮形式的 Radio 激活时的文本颜色
          },
        },
        {
          label: "3",
          value: "opt3",
          props: {
            disabled: true,
            size: "large", //large / default /small
            textColor: "#e94242", //按钮形式的 Radio 激活时的文本颜色
            border: true,
          },
        },
      ],
    },
    val: {
      desc: "",
      value: null,
    },
  },
  {
    id: {
      desc: "id",
      value: 1,
    },
    name: {
      desc: "name",
      value: "",
    },
    type: {
      desc: "类型",
      value: "DATE_TIME",
    },
    title: {
      desc: "标题",
      value: "时间选择器",
    },
    prompt_msg: {
      desc: "默认内容",
      value: "请选择时间",
    },
    timeType: {
      desc: "时间类型",
      value: "datetime", //year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange
    },
    rangeSeparator: {
      desc: "选择范围时的分隔符",
      value: "->",
    },
    startPlaceholder: {
      desc: "范围选择时开始日期的占位内容",
      value: "开始时间",
    },
    endPlaceholder: {
      desc: "范围选择时结束日期的占位内容",
      value: "结束时间",
    },
    format: {
      desc: "显示在输入框中的格式",
      value: "",
    },
    rule: {
      desc: "rule",
      value: [],
    },
    size: {
      desc: "尺寸",
      value: "large",
    },
    disabledDate: {
      desc: "设置禁用日期",
      value: (time) => {
        return time.getTime() > Date.now();
      },
    },
    shortcutOpt: {
      desc: "shortcutOpt",
      value: false,
    },
    unlinkPanels: {
      desc: "unlinkPanels",
      value: true,
    },
    val: {
      desc: "val",
      value: null,
    },
  },
]);
const list2 = ref([]);

const emit = defineEmits(["formConfig"]);
let currentFormConfig = ref(null);

const log = (e) => {
  e.added.element.id = {
    desc: "id",
    value: randomRangeId(10),
  };
  currentFormConfig.value = e.added.element;
  console.log("currentFormConfig.value.", currentFormConfig.value);
  currentFormConfig.value.ruleName = {
    label: "校验规则",
    value: [],
  };
  currentFormConfig.value.rule.value.forEach((item) => {
    console.log("配置规则", item);
    currentFormConfig.value.ruleName.value.push(item.name);
  });
  // currentFormConfig.value.ruleName = [];
  // currentFormConfig.value.rule.forEach((item) => {
  //   console.log("配置规则", item);
  //   currentFormConfig.value.ruleName.push(item.name);
  // });
  allData.currentFormConfigByPinia = currentFormConfig.value;
  console.log("当前配置", toRaw(e.added.element));

  console.log("加入", allData.formList);
  allData.formConfigVisible = true;
  emit("formConfig", currentFormConfig.value);
  // allData.formList = list2.value;
};

const showFormItem = (e, configItems) => {
  console.log(e, configItems);
  allData.formConfigVisible = true;
  currentFormConfig.value = configItems;
  currentFormConfig.value.ruleName = [];
  currentFormConfig.value.rule.value.forEach((item) => {
    currentFormConfig.value.ruleName.push(item.name);
  });
  console.log("currentFormConfig", currentFormConfig.value);
  emit("formConfig", currentFormConfig.value);
};
const deleteFormItem = (e) => {
  event.stopPropagation(); //阻止冒泡
  allData.formList.forEach((item, index) => {
    if (item.id === e) {
      allData.formList.splice(index, 1);
    }
  });
};
</script>

<style scoped lang="less">
.drag-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list-group-item {
  line-height: 50px;
}
.configForm {
  cursor: pointer;
  &:hover {
    .deleteFormItem {
      opacity: 1;
    }
  }
}
.deleteFormItem {
  opacity: 0;
}
</style>
