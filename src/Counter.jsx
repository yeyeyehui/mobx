import React from "react";

import { makeAutoObservable } from "mobx";

import {
  observer,
  Observer,
  useObserver,
  useLocalObservable,
} from "mobx-react";

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
export default function () {
  const store = useLocalObservable(() => ({
    number: 1,

    add() {
      this.number++;
    },
  }));

  return useObserver(() => (
    <>
      <p>{store.number}</p>

      <button onClick={store.add}>+</button>
    </>
  ));
}
