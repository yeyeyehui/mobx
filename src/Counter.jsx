import React from "react";

import { makeAutoObservable } from "mobx";

import {
  observer,
  Observer,
  useObserver,
  useLocalObservable,
} from "./mobx-react";

// =========================================================
/**
 * observer function
 */
// class Store {
//   number = 1;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   add() {
//     this.number++;
//   }
// }

// let store = new Store();

// export default observer(function () {
//   return (
//     <div>
//       <p>{store.number}</p>

//       <button onClick={store.add}>+</button>
//     </div>
//   );
// });

// =========================================================

/**
 * observer class
 */
// class Store {
//   number = 1;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   add() {
//     this.number++;
//   }
// }

// let store = new Store();

// @observer
// class Counter extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>{store.number}</p>

//         <button onClick={store.add}>+</button>
//       </div>
//     );
//   }
// }

// export default Counter;

// =========================================================

/**
 * Observer精细化更新
 */
// class Store {
//   number = 1;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   add() {
//     this.number++;
//   }
// }

// let store = new Store();
// export default function () {
//   return (
//     <div>
//       <Observer>
//         {
//           () => (
//             <>
//               <p>{store.number}</p>
//               <button onClick={store.add}>+</button>
//             </>)
//         }
//       </Observer>
//       <Child />
//     </div>
//   )
// }

// =========================================================

/**
 * useObserver hooks方式更新
 */
// class Store {
//   number = 1;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   add() {
//     this.number++;
//   }
// }

// let store = new Store();

// export default function () {
//   return useObserver(() => (
//     <>
//       <p>{store.number}</p>
//       <button onClick={store.add}>+</button>
//     </>
//   ));
// }

// =========================================================

/**
 * useLocalObservable hooks方式把对象变成可观察对象
 */
// export default function () {
//   const store = useLocalObservable(() => ({
//     number: 1,

//     add() {
//       this.number++;
//     },
//   }));

//   return useObserver(() => (
//     <>
//       <p>{store.number}</p>

//       <button onClick={store.add}>+</button>
//     </>
//   ));
// }

// =========================================================

/**
 * observable 源码
 */
// import { observable, autorun } from "./mobx";

// const proxyObj = observable({ name: "1", age: '2' });

// console.log(proxyObj);

// // 先执行一遍回调，下面赋值的时候再执行一遍
// // 因为先执行一遍后可以触发proxy，进行收集
// autorun(() => {
//   console.log(proxyObj.name);
// });

// proxyObj.name = 2;
// proxyObj.age = 3;

// export default function () {}

// =========================================================

// class Store {
//   number = 1;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   add() {
//     this.number++;
//   }
// }

// let store = new Store();

// export default function () {
//   return useObserver(() => (
//     <div>
//       <p>{store.number}</p>
//       <button onClick={store.add}>+</button>
//     </div>
//   ));
// }

// =========================================================
// class Store {
//   number = 1;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   add() {
//     this.number++;
//   }
// }

// let store = new Store();

// export default function () {
//   return (
//     <Observer>
//       {() => (
//         <div>
//           <p>{store.number}</p>
//           <button onClick={store.add}>+</button>
//         </div>
//       )}
//     </Observer>
//   );
// }

// =========================================================

// export default function (props) {
//   const store = useLocalObservable(() => ({
//     number: 1,

//     add() {
//       this.number++;
//     },
//   }));

//   return useObserver(() => (
//     <div>
//       <p>{store.number}</p>
//       <button onClick={store.add}>+</button>
//     </div>
//   ));
// }

// =========================================================
class Store {
  number = 1;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  add() {
    this.number++;
  }
}
let store = new Store();

export default observer(function () {
  return (
    <div>
      <p>{store.number}</p>
      <button onClick={store.add}>+</button>
    </div>
  );
});
