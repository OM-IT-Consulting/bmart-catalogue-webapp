import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes';
import configureStore from './store';
import { Provider } from 'react-redux';

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

export const renderComponent = () => {
  root.render(
    <Provider store={store}>
        <App/>
    </Provider>
  );
}

const defaultComponent = renderComponent();
export default defaultComponent;