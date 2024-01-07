import { globalState } from "./utils";

export default class Reaction {
  constructor(name, onInvalidate) {
    this.name = name; // name = "Autorun@2"
    this.onInvalidate = onInvalidate; // 回调
    this.observing = []; //表示它观察到了哪些可观察变量
  }

  track(fn) {
    //Derivation=reaction
    globalState.trackingDerivation = this;

    fn.call();

    globalState.trackingDerivation = null;

    bindDependencies(this);
  }

  schedule() {
    // 存储变化
    globalState.pendingReactions.push(this);
  
    runReactions();
  }

  /**
   * 执行track
   */
  runReaction() {
    this.onInvalidate();
  }
}

function bindDependencies(derivation) {
  const { observing } = derivation;
  
  observing.forEach((observableValue) => {
    observableValue.observers.add(derivation);
  });
}

/**
 * 执行存储的值变化
 */
function runReactions() {
  const allReactions = globalState.pendingReactions;

  let reaction;
  
  while ((reaction = allReactions.shift())) {
    reaction.runReaction();
  }
}
