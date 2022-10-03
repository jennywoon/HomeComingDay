import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactPWAInstallProvider from "react-pwa-install";
// import Loading from './components/test/Loading';
// import reportWebVitals from './reportWebVitals';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Suspense fallback={<Loading />}>
  <ReactPWAInstallProvider enableLogging>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ReactPWAInstallProvider>
  // </Suspense>
);

// reportWebVitals();
// serviceWorkerRegistration.register();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceworker.js");
  });
}