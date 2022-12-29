import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import IntlProviderWrapper from './hoc/IntlProviderWrapper';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StyledEngineProvider injectFirst>
        <BrowserRouter>
            <Provider store={store}>
                <IntlProviderWrapper>
                    <Auth0Provider
                        domain={process.env.REACT_APP_DOMAIN}
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        redirectUri={`${window.location.origin}/admin`}
                    >
                        <App />
                    </Auth0Provider>
                </IntlProviderWrapper>
            </Provider>
        </BrowserRouter>
    </StyledEngineProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
