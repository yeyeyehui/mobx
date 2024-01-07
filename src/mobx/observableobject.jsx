import { getNextId, addHiddenProp, $mobx, getAdm, globalState } from "./utils";

/**
 * 可观察值管理器
 */
class ObservableValue {
  constructor(value) {
    // 这个就是属性的值
    this.value = value;

    this.observers = new Set(); //此可观察值的监听者，可以说观察者
  }

  /**
   * 获取value
   * @returns 新的value
   */
  get() {
    reportObserved(this);

    return this.value;
  }

  /**
   * 设置value
   * @param {*} newValue 新的value值
   */
  setNewValue(newValue) {
    this.value = newValue;

    propagateChanged(this);
  }
}

/**
 * 设置新值的时候触发
 * @param {*} observableValue 
 */
function propagateChanged(observableValue) {
  const { observers } = observableValue;

  // 把track方法存储的进行执行触发回调
  observers.forEach((observer) => {
    observer.runReaction();
  });
}

/**
 * 读取值的时候触发，在autorun回调的时候会先执行，从而触发reportObserved方法进行当前this存储
 * @param {*} observableValue 
 */
function reportObserved(observableValue) {
  const trackingDerivation = globalState.trackingDerivation;

  // 存储this
  if (trackingDerivation) {
    trackingDerivation.observing.push(observableValue);
  }
}

/**
 * 对象管理器，控制读写属性
 */
class ObservableObjectAdministration {
  constructor(target, values, name) { // target = {} values = Map(0){size: 0} name = "ObservableObject@1"
    this.target = target; // 目标对象
    this.values = values; //存放属性的信息
    this.name = name; // 对象的名字
  }

  get(key) {
    return this.target[key];
  }

  set(key, value) {
    if (this.values.has(key)) {
      return this.setObservablePropValue(key, value);
    }
  }

  /**
   * 设置属性
   * @param {*} key 属性名
   * @param {*} descriptor 描述器
   */
  extend(key, descriptor) {
    this.defineObservableProperty(key, descriptor.value); //name,1
  }

  /**
   * 设置value值，走的其实是ObservableObjectAdministration实例的set方法，然后再走ObservableValue实例的setNewValue方法
   * @param {*} key
   * @param {*} value
   * @returns
   */
  setObservablePropValue(key, value) {
    const observableValue = this.values.get(key);

    observableValue.setNewValue(value);

    return true;
  }

  /**
   * 获取value值，走的其实是ObservableObjectAdministration实例的get方法，然后再走ObservableValue实例的get方法
   * @param {*} key 属性
   * @returns 值
   */
  getObservablePropValue(key) {
    return this.values.get(key).get();
  }

  /**
   * 定义一个观察对象的属性和设置属性值和默认行为
   * @param {*} key 属性
   * @param {*} value 值
   */
  defineObservableProperty(key, value) {
    const descriptor = {
      configurable: true, // 该属性的类型不能在数据属性和访问器属性之间更改，不可被删除，其描述符的其他属性也不能被更改
      enumerable: true, // 不能被枚举
      get() {
        return this[$mobx].getObservablePropValue(key); // key = "name"
      },
      set() {
        return this[$mobx].setObservablePropValue(key, value); // key = "name", value = "1"
      },
    };

    // 给目标对象定义属性
    // 给对象读写属性的时候会走descriptor，从而走getObservablePropValue和setObservablePropValue方法
    // 这样再修改属性的时候就会触发get或者set
    Object.defineProperty(this.target, key, descriptor);

    // 创建一个可观察值
    this.values.set(key, new ObservableValue(value)); // key = "name", value = "1"
  }
}

/**
 * 创建一个观察对象的管理器并且赋值给target
 * @param {*} target
 * @returns
 */
function asObservableObject(target) { // target = {}
  // 创建观察对象的名字
  const name = `ObservableObject@${getNextId()}`; // name = "ObservableObject@1"

  // 创建一个可观察对象的管理器
  // target： 目标对象， new Map()： 对象的属性，name：可观察对象的名字
  const adm = new ObservableObjectAdministration(target, new Map(), name); // adm = 可观察对象的管理器的实例

  // 给target设置一个值为adm的"ObservableObject@1"属性 并且设置对象的默认属性行为
  addHiddenProp(target, $mobx, adm); //target[$mobx]=adm === Symbol(mobx administration): {ObservableObject@1: object}

  return target;
}

/**
 * 初始化空对象的代理，这里做属性拦截
 */
const objectProxyTraps = {
  get(target, name) {
    // 在这里获取对应的可观察对象的属性
    return getAdm(target).get(name);
  },
  set(target, name, value) {
    // 在这里设置对应的可观察对象的属性
    return getAdm(target).set(name, value);
  },
};

/**
 * 创建一个可观察的空对象
 * @param {*} target 目标对象
 * @returns 返回一个代理
 */
function asDynamicObservableObject(target) { // target = {}
  asObservableObject(target); // 现在target里面有一个管理器

  // 创建空对象的属性代理
  const proxy = new Proxy(target, objectProxyTraps);

  return proxy;
}

/**
 * 把目标对象的属性转移到可观察对象里面
 * @param {*} proxyObject 可观察对象
 * @param {*} properties 目标对象
 * @returns
 */
function extendObservable(proxyObject, properties) {
  // 返回一个对象的所有自有属性（包括不可枚举属性）的属性描述符
  const descriptors = Object.getOwnPropertyDescriptors(properties);

  // 根据id获取对应的可观察对象
  const adm = proxyObject[$mobx];

  // 循环赋值
  Reflect.ownKeys(descriptors).forEach((key) => {
    adm.extend(key, descriptors[key]);
  });

  // 返回可观察对象
  return proxyObject;
}

/**
 *
 * @param {*} target
 * @returns
 */
export function object(target) { // target = {name: '1', age: '2'}
  // {get: function, set: function, Symbol(mobx administration): {ObservableObject@1: object}}
  const dynamicObservableObject = asDynamicObservableObject({});

  return extendObservable(dynamicObservableObject, target);
}
