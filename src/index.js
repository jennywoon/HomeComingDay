import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Loading from './components/test/Loading';

const persistor = persistStore(store);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactQueryDevtools initialIsOpen={true} />
          <App />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </Suspense>
);
