import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactPWAInstallProvider from "react-pwa-install";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReactPWAInstallProvider enableLogging>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ReactPWAInstallProvider>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceworker.js");
  });
}