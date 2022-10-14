import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes';
import configureStore from './store';
import { Provider } from 'react-redux';

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
      <App/>
  </Provider>
);
