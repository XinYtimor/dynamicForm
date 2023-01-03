export const typeTest = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};
//获取对象的所有属性名
export const getObjKeys = (obj) => {
  let result = [];
  function getKey(obj) {
    Object.keys(obj).forEach((key) => {
      if (typeTest(obj[key]) === "Object") {
        getKey(obj[key]);
      } else {
        result.push(key);
      }
    });
    return result;
  }
  return getKey(obj);
};
export const randomRangeId = (num) => {
  var returnStr = "",
    charStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < num; i++) {
    var index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substring(index, index + 1);
  }
  return returnStr;
};
