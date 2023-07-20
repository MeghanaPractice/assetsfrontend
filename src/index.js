import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme.js';
ReactDOM.render(
    <Auth0Provider
        domain="dev-dzdeplr5qenffej4.eu.auth0.com"
        clientId="8seDdJkJPGNInrGfq2QBUKkX7Yvle6wp"
        authorizationParams={{
            redirect_uri: 'http://127.0.0.1:3000'
        }}
    >
         <ThemeProvider theme={theme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
        </ThemeProvider>
    </Auth0Provider>,
    document.getElementById('root')
);

