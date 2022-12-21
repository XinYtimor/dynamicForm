import { rules } from "./rules";

export const typeObj = {
  1: "年假",
  2: "病假",
  3: "调休",
  4: "事假",
  5: "婚假",
  6: "丧假",
  7: "产假",
  8: "陪产假",
  9: "补假",
};

export const selectConfig = [
  {
    value: 0,
    label: "年假",
  },
  {
    value: 1,
    label: "病假",
  },
  {
    value: 2,
    label: "调休",
  },
  {
    value: 3,
    label: "事假",
  },
];

export const setFormConfig = {
  // 年假
  0: [
    {
      name: "start_time",
      type: "DATE_TIME",
      title: "时间选择器",
      prompt_msg: "请选择时间",
      defultProps: {
        type: "datetime", //year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange
        rangeSeparator: "->",
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        format: "",
        size: "large",
        //设置禁用日期
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        },
        shortcutOpt: false,
        unlinkPanels: true,
      },
      val: null,

      // rule: [
      //   {
      //     required: true,
      //     message: "Please input Activity name",
      //     trigger: "blur",
      //   },
      //   { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      // ],
    },
    {
      name: "url",
      type: "input",
      title: "网址",
      prompt_msg: "请输入网址",
      defultProps: {},
      rule: [rules.IsEmpty, rules.URL, rules.LowerCase],
      val: null,
    },

    {
      name: "notes",
      type: "input",
      title: "请假事由（必填）：",
      prompt_msg: "请输入请假事由",
      defultProps: {
        autosize: { minRows: 2, maxRows: 4 },
        type: "textarea",
      },

      val: null,
    },
    {
      name: "like",
      type: "radio",
      title: "单项选择",
      prompt_msg: "",
      defultProps: {
        fill: "#000000",
        textColor: "#e94242", //按钮形式的 Radio 激活时的文本颜色
        options: [
          {
            label: "1",
            value: "opt1",
            props: {
              disabled: true,
              size: "large", //large / default /small
              textColor: "#e94242", //按钮形式的 Radio 激活时的文本颜色
            },
          },
          {
            label: "2",
            value: "opt2",
            props: {
              border: true,
            },
          },
          {
            label: "3",
            value: "opt3",
            props: {
              size: "large", //large / default /small
            },
          },
        ],
      },

      val: null,
    },
    {
      name: "score",
      type: "rate",
      title: "评分",
      prompt_msg: "",
      defultProps: {
        colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
        size: "small",
        allowHalf: true,
        texts: ["oops", "disappointed", "normal", "good", "great"],
        showText: true,
        max: 5,
        lowThreshold: 2,
      },
      val: null,
    },
    {
      name: "numberInput",
      type: "numberInput",
      title: "数字输入框",
      prompt_msg: "",
      defultProps: {
        min: 1,
        max: 100,
        step: 2,
        precision: 2, //精度
        position: "right",
      },
      val: null,
    },
  ],

  // 病假
  1: [
    {
      name: "start_time",
      type: "halfdaydate",
      title: "开始时间",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "end_time",
      type: "halfdaydate",
      title: "结束时间",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "leave_length",
      type: "leavelength",
      title: "请假时长",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "notes",
      type: "multiple",
      title: "请假事由（必填）：",
      prompt_msg: "请输入请假事由",
      val: null,
    },
    {
      name: "imgs",
      type: "images",
      title: "上传图片：",
      prompt_msg: "请上传图片",
      val: null,
    },
  ],

  // 调休
  2: [
    {
      name: "start_time",
      type: "halfdaydate",
      title: "开始时间",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "end_time",
      type: "halfdaydate",
      title: "结束时间",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "leave_length",
      type: "leavelength",
      title: "请假时长",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "overtime_compensation",
      type: "date",
      title: "调休替代日期",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "notes",
      type: "multiple",
      title: "请假事由（必填）：",
      prompt_msg: "请输入请假事由",
      val: null,
    },
    {
      name: "imgs",
      type: "images",
      title: "上传图片：",
      prompt_msg: "请上传图片",
      val: null,
    },
  ],

  // 事假
  3: [
    {
      name: "start_time",
      type: "halfdaydate",
      title: "开始时间",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "end_time",
      type: "halfdaydate",
      title: "结束时间",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "leave_length",
      type: "leavelength",
      title: "请假时长",
      prompt_msg: "请选择",
      val: null,
    },
    {
      name: "notes",
      type: "multiple",
      title: "请假事由（必填）：",
      prompt_msg: "请输入请假事由",
      val: null,
    },
  ],
};

export const getRules = (currentIndex) => {
  let rules = [];
  setFormConfig[currentIndex].forEach((item) => {
    rules[item.name] = item.rule || [];
  });
  return rules;
};
