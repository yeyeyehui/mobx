import { useContext, useRef } from "react";

import StoreContext from "./context";

import { observer } from "mobx-react";

const User = observer(() => {
  const { userStore } = useContext(StoreContext);

  const ref = useRef(null);

  return (
    <div>
      {userStore.isLogin ? (
        <>
          {userStore.username}
          <button onClick={userStore.logout}>退出</button>
        </>
      ) : (
        <>
          <input ref={ref} type="text" />
          <button onClick={() => userStore.login(ref.current.value)}>
            登录
          </button>
        </>
      )}
    </div>
  );
});
export default User;
