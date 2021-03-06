import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

interface Iauth0Object {
  domain: string;
  clientId: string;
  audience: string;
  redirectUri: string;
  scope: string;
}
const auth0Object: Iauth0Object = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN!,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID!,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI!,
  scope: process.env.REACT_APP_AUTH0_SCOPE!
}

ReactDOM.render(
  <Auth0Provider
    domain={auth0Object.domain}
    clientId={auth0Object.clientId}
    redirectUri={auth0Object.redirectUri}
    audience={`${auth0Object.audience}`}
    scope={auth0Object.scope}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




