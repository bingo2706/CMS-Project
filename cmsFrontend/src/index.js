import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import IntlProviderWrapper from './hoc/IntlProviderWrapper';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StyledEngineProvider injectFirst>
        <BrowserRouter>
            <Provider store={store}>
                <IntlProviderWrapper>
                    <App />
                </IntlProviderWrapper>
            </Provider>
        </BrowserRouter>
    </StyledEngineProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
