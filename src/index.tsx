import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./Router/AppRouter";
import { GlobalProvider } from "./config/context/GlobalContext";
import "./index.css";
import "./App.css";

const root = document.getElementById("root");
//@ts-ignore
root.style.overflow = "auto!important";

//@ts-ignore
document.querySelector("html").style.overflow = "auto !important";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>
  </React.StrictMode>,
  root
);
