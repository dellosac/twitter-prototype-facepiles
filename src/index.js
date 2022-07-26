import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/App.scss";

import { IMAGE_PRELOADER } from "./utils";

sessionStorage.setItem("show_ghosts", 0);
IMAGE_PRELOADER.loadImages();
// reset localstorage
console.log("reset storage");
localStorage.setItem("read-replies", JSON.stringify(["reply-3-root-tweet-1", "reply-2-root-tweet-1", "reply-2-root-tweet-2"]));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
