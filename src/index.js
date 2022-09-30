import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import Loading from './components/test/Loading';
import ReactPWAInstallProvider from "react-pwa-install";
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loading />}>
    <ReactPWAInstallProvider enableLogging>
    <Provider store={store}>
        <App />
    </Provider>
    </ReactPWAInstallProvider>
  </Suspense>
);

reportWebVitals();
serviceWorkerRegistration.register();

if ("serviceWorker" in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}