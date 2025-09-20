import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';

import './index';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
          </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals