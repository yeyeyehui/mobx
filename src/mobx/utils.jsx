export const $mobx = Symbol("mobx administration");

/**
 * 判断是不是对象
 * @param {*} value
 * @returns 是 === true 否 === false
 */
export function isObject(value) {
  return value !== null && typeof value === "object";
}

let mobxGuid = 0;

/**
 * @returns 创建mobx对象的唯一id
 */
export function getNextId() {
  return ++mobxGuid;
}

/**
 * 设置对象的属性行为
 * @param {*} obj 对象
 * @param {*} propName 属性
 * @param {*} value 值
 */
export function addHiddenProp(obj, propName, value) {
  Object.defineProperty(obj, propName, {
    enumerable: false, // 不能被枚举
    writable: true, // 可以使用赋值运算符
    configurable: false, // 该属性的类型不能在数据属性和访问器属性之间更改，不可被删除，其描述符的其他属性也不能被更改
    value,
  });
}

export function getAdm(target) {
  return target[$mobx];
}

// 全局的值状态
export const globalState = {
  pendingReactions: [],
  trackingDerivation: null,
};
