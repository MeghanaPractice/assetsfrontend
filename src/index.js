/*For use of BeQiSoft Pvt Ltd. */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme.js'
import auth_config from './auth_config.json'
import { UserRoleProvider } from './context/UserRoleContext'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-alert'
import { options } from './options'

const { domain, clientId, appOrigin } = auth_config
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
)
