import { createRoot } from "react-dom/client";

import Counter from "./Counter";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <>
    <Counter />
    <div>=====================================</div>
    <div>=====================================</div>
    <div>=====================================</div>
    <div>=====================================</div>
    <App />
  </>
);
