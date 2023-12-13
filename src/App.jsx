import React from "react";

import store from "./store";

import StoreContext from "./context";

import User from "./User";

import Todos from "./Todos";

const App = () => (
  <StoreContext.Provider value={store}>
    <User />
    <hr />
    <Todos />
  </StoreContext.Provider>
);

export default App;
