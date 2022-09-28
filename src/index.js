import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Loading from './components/test/Loading';
import ReactPWAInstallProvider from "react-pwa-install";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
    // retry: 0,
    suspense: true,
    useErrorBoundary: true,
    // refetchInterval: 3000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    }
    }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loading />}>
    <ReactPWAInstallProvider enableLogging>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        <App />
      </QueryClientProvider>
    </Provider>
    </ReactPWAInstallProvider>
  </Suspense>
);
