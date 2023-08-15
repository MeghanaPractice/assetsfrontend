import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme.js';
import auth_config from './auth_config.json';
import { UserRoleProvider } from './context/UserRoleContext';
import AlertTemplate from 'react-alert-template-basic';
import { positions,Provider } from 'react-alert';

const { domain, clientId, appOrigin } = auth_config;
const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT
  };
ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: appOrigin
        }}
    >
        <ThemeProvider theme={theme}>
        <Provider template={AlertTemplate} {...options}>
            <React.StrictMode>
                <UserRoleProvider>
                    <App />
                </UserRoleProvider>
            </React.StrictMode>
            </Provider>
        </ThemeProvider>
    </Auth0Provider>,
    document.getElementById('root')
);

