import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./Router/AppRouter";

const root = document.getElementById("root");
//@ts-ignore
root.style.overflow = "auto!important";
//@ts-ignore
document.querySelector("html").style.overflow = "auto !important";

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  root
);
