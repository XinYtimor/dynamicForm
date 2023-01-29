export const rules = {
  IsEmpty: {
    required: true,
    message: "请输入内容",
    trigger: "blur",
    name: "isEmpty",
  },
  URL: {
    name: "URL",
    message: "URL格式不正确",
    trigger: "blur",
    pattern:
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?"\\+&%$#=~_-]+))*$/,
  },

  LowerCase: {
    name: "LowerCase",
    message: "只能输入小写字母",
    trigger: "blur",
    pattern: /^[a-z]+$/,
  },

  UpperCase: {
    name: "UpperCase",
    message: "只能输入大写字母",
    trigger: "blur",
    pattern: /^[A-Z]+$/,
  },

  Alphabets: {
    name: "Alphabets",
    message: "只能输入字母",
    trigger: "blur",
    pattern: /^[A-Za-z]+$/,
  },

  Email: {
    name: "Email",
    message: "邮箱地址格式不正确",
    trigger: "blur",
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },

  Mobile: {
    name: "Mobile",
    message: "手机号格式不正确",
    trigger: "blur",
    pattern: /^1\d{10}$/,
  },

  Phone: {
    name: "Phone",
    message: "电话号码格式不正确",
    trigger: "blur",
    pattern: /^(0\d{2,3})?-?\d{7,8}$/,
  },

  Postcode: {
    name: "Postcode",
    message: "邮编格式不正确",
    trigger: "blur",
    pattern: /^[0-9][0-9]{5}$/,
  },

  Number: {
    name: "Number",
    message: "只能输入纯数字",
    trigger: "blur",
    pattern: /^\d+$/,
  },

  Fax: {
    name: "Fax",
    message: "传真格式不正确",
    trigger: "blur",
    pattern: /^(\d{3,4}-)?\d{7,8}$/,
  },

  Int: {
    name: "Int",
    message: "只能输入非负整数",
    trigger: "blur",
    pattern: /^((0)|([1-9]\d*))$/,
  },

  IntPlus: {
    name: "IntPlus",
    message: "只能输入正整数",
    trigger: "blur",
    pattern: /^[1-9]\d*$/,
  },

  Float1: {
    name: "Float1",
    message: "只能输入数字，最多一位小数",
    trigger: "blur",
    pattern: /^-?\d+(\.\d)?$/,
  },

  Float2: {
    name: "Float2",
    message: "只能输入数字，最多两位小数",
    trigger: "blur",
    pattern: /^-?\d+(\.\d{1,2})?$/,
  },

  Float3: {
    name: "Float3",
    message: "只能输入数字，最多三位小数",
    trigger: "blur",
    pattern: /^-?\d+(\.\d{1,3})?$/,
  },

  FloatPlus3: {
    name: "FloatPlus3",
    message: "只能输入大于0的数字，最多三位小数",
    trigger: "blur",
    pattern: /^\d+(\.\d{1,3})?$/,
  },

  Encode(code) {
    const regex = /^(_|-|[a-zA-Z0-9])+$/;
    return valid(code, regex, "编码只能使用字母、数字、下划线、中划线");
  },

  Encode2(code) {
    const regex = /^[a-zA-Z0-9]+$/;
    return valid(code, regex, "编码只能使用字母、数字");
  },

  Encode3(code) {
    const regex = /^(_|[a-zA-Z0-9])+$/;
    return valid(code, regex, "编码只能使用字母、数字、下划线");
  },

  IdCard: {
    name: "IdCard",
    message: "请输入正确的身份证号码",
    trigger: "blur",
    pattern:
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  },

  USCC: {
    name: "USCC",
    message: "请输入正确的社会信用号",
    trigger: "blur",
    pattern: /^[0-9A-Z]{18}/,
  },

  CarNum: {
    name: "CarNum",
    message: "请输入正确的车牌号",
    trigger: "blur",
    pattern:
      /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/i,
  },

  CNandEN: {
    name: "CNandEN",
    message: "只能使用中文、英文",
    trigger: "blur",
    pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/,
  },

  MobileOrPhone: {
    name: "MobileOrPhone",
    message: "手机或电话号格式不正确",
    trigger: "blur",
    pattern: /^1\d{10}$/ || /^(0\d{2,3})?-?\d{7,8}$/,
  },
};
