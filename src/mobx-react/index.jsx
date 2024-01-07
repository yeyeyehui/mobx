import React, { useState } from "react";

import { Reaction, observable } from "mobx";

/**
 *
 * @param {*} fn 可观察对象变化时执行的函数
 * @returns
 */
export function useObserver(fn) {
  //仅仅是为了得到一个强行更新组件的函数
  const [, setState] = useState({});

  const forceUpdate = () => setState({});

  let reaction = new Reaction("observer", forceUpdate);

  let rendering;

  reaction.track(() => {
    rendering = fn();
  });

  return rendering;
}

/**
 * Observer精细化更新
 * @param {*} param 需要更新的组件
 * @returns
 */
export function Observer({ children }) {
  return useObserver(children);
}

/**
 * 如果包裹的是类组件，进行特殊操作
 * @param {*} ClassComponent 
 * @returns 
 */
function makeClassComponentObserver(ClassComponent) {
  const prototype = ClassComponent.prototype;

  const originalRender = prototype.render;
  
  // 封装render
  prototype.render = function () {
    const boundOriginalRender = originalRender.bind(this);

    const reaction = new Reaction("render", () =>
      React.Component.prototype.forceUpdate.call(this)
    );
    
    let rendering;
    
    reaction.track(() => {
      rendering = boundOriginalRender();
    });
    
    return rendering;
  };
  
  return ClassComponent;
}

/**
 * 整个函数或者类具有可观察对象
 * @param {*} oldComponent
 * @returns
 */
export function observer(oldComponent) {
  // 判断是函数组件还是类组件
  if (oldComponent.prototype && oldComponent.prototype.isReactComponent) {
    return makeClassComponentObserver(oldComponent);
  }

  // 使用useObserver进行包裹，其实就是触发里面的get函数
  let observerComponent = (props) => {
    return useObserver(() => oldComponent(props));
  };

  return observerComponent;
}

/**
 * 在组件内创建一个可观察对象
 * @param {*} initializer 初始化数据
 * @returns 返回一个hooks
 */
export function useLocalObservable(initializer) {
  return useState(() => observable(initializer(), {}, { autoBind: true }))[0];
}
