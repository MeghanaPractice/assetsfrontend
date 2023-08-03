import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme.js';
import auth_config from './auth_config.json';
import { UserRoleProvider } from './context/UserRoleContext';
const { domain, clientId, appOrigin } = auth_config;

ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: appOrigin
        }}
    >
        <ThemeProvider theme={theme}>
            <React.StrictMode>
                <UserRoleProvider>
                    <App />
                </UserRoleProvider>
            </React.StrictMode>
        </ThemeProvider>
    </Auth0Provider>,
    document.getElementById('root')
);

