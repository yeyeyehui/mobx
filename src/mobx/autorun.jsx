import { getNextId } from "./utils";

import Reaction from "./reaction";

/**
 * 监听值变化
 * @param {*} view 回调函数
 */
function autorun(view) {
  const name = "Autorun@" + getNextId(); // name = "Autorun@2"

  // 创建值变化的实例
  const reaction = new Reaction(name, function () {
    this.track(view);
  });

  // 调度
  reaction.schedule();
}

export default autorun;
