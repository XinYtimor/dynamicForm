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
      selectOptions: [
        {
          value: "day",
          label: "天",
        },
        {
          value: "week",
          label: "周",
        },
        {
          value: "month",
          label: "月",
        },
      ],
      selectOptions: [],
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
