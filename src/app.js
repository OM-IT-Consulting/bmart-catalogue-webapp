import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes';
import configureStore from './store';
import { Provider } from 'react-redux';
import MFIntegration from './features/samplepages/mfintegration';
import Application from './features/samplepages/application';

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

const renderComponent = () => {
    root.render(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

//const defaultComponent = renderComponent();
//export default renderComponent;

const Button = () => (
    <button>App Microfrontend  Button</button>
);


export default Button;