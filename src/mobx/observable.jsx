import { isObject } from "./utils";

import { object } from "./observableobject";

/**
 * 把一个对象变成可观察对象
 * @param {*} 目标对象
 * @returns
 */
function observable(v) { // v = {name: '1', age: '2'}
  if (isObject(v)) { // true
    return object(v);
  }
}

export default observable;
