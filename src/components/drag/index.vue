<template>
  <h1>drag</h1>
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
            {{ element.title }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="drag2">
      表单
      <!-- <draggable v-model="list2" tag="tbody" item-key="name">
        <template #item="{ element }">
          <tr>
            <td scope="row">{{ element.id }}</td>
            <td>{{ element.name }}</td>
            <td>{{ element.sport }}</td>
          </tr>
        </template>
      </draggable> -->
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
          >
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
            <el-input-number
              v-if="element.type === 'numberInput'"
              v-model="formLabelAlign[element.name]"
              :min="element.min"
              :max="element.max"
              :step="element.step"
              :precision="element.precision"
              :controls-position="element.position"
            />
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
          </el-form-item>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { randomRangeId } from "../../utils/utils";
import { reactive, ref, toRaw } from "vue";
import { globalData } from "../../store/globalData";
const allData = globalData();
const labelPosition = ref("top");

const formLabelAlign = reactive({});
const drag = ref(false);
const list1 = ref([
  {
    id: 1,
    name: "",
    type: "input",
    title: "输入框",
    prompt_msg: "请输入内容",
    disabled: false,
    clearable: true,
    inputType: "",
    rule: [],
    val: null,
  },
  {
    name: "",
    type: "numberInput",
    title: "数字输入框",
    prompt_msg: "",
    min: 1,
    rule: [],
    max: 100,
    step: 2,
    precision: 2, //精度
    position: "right",
    val: null,
  },
  {
    name: "score",
    type: "rate",
    title: "评分",
    prompt_msg: "",
    colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    size: "small",
    rule: [],
    allowHalf: true,
    texts: ["oops", "disappointed", "normal", "good", "great"],
    showText: true,
    max: 5,
    lowThreshold: 2,
    val: null,
  },
  {
    name: "slider",
    type: "slider",
    title: "滑块",
    rule: [],
    prompt_msg: "请选择",
    step: 5,
    showInput: false,
    showStops: true,
    range: true, //范围选择
    debounce: 500,
    placement: "top", //top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    marks: {
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
    // disabled: false,
    clearable: true,
    multiple: true, //多选
    collapseTags: true, //合并为一段文字
    collapseTagsTooltip: true, //鼠标悬停折叠文字以显示具体所选值
    val: null,
  },
  {
    name: "select",
    type: "select",
    title: "选择器",
    prompt_msg: "请选择",
    slot: "",
    rule: [],
    // disabled: false,
    clearable: true,
    multiple: true, //多选
    collapseTags: true, //合并为一段文字
    collapseTagsTooltip: true, //鼠标悬停折叠文字以显示具体所选值
    options: [
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
    val: null,
  },
  {
    name: "like",
    type: "radio",
    rule: [],
    title: "单项选择",
    prompt_msg: "",
    fill: "#000000",
    textColor: "#e94242", //按钮形式的 Radio 激活时的文本颜色
    radioOptions: [
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

    val: null,
  },
  {
    name: "start_time",
    type: "DATE_TIME",
    title: "时间选择器",
    prompt_msg: "请选择时间",
    type: "datetime", //year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange
    rangeSeparator: "->",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    format: "",
    rule: [],
    size: "large",
    //设置禁用日期
    disabledDate: (time) => {
      return time.getTime() > Date.now();
    },
    shortcutOpt: false,
    unlinkPanels: true,
    val: null,
  },
]);
const list2 = ref([
  {
    id: 1,
    name: "Abby",
    sport: "basket",
    title: "输入框",
    prompt_msg: "请输入内容",
    type: "input",
  },
]);

const emit = defineEmits(["formConfig"]);
let currentFormConfig = ref(null);

const log = (e) => {
  console.log("randomRangeId", randomRangeId(10));
  e.added.element.id = randomRangeId(10);
  currentFormConfig.value = e.added.element;
  currentFormConfig.value.ruleName = [];
  currentFormConfig.value.rule.forEach((item) => {
    currentFormConfig.value.ruleName.push(item.name);
  });
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
  currentFormConfig.value.rule.forEach((item) => {
    currentFormConfig.value.ruleName.push(item.name);
  });
  console.log("currentFormConfig", currentFormConfig.value);
  emit("formConfig", currentFormConfig.value);
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
</style>
