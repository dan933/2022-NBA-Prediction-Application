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
}
const auth0Object: Iauth0Object = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN!,
  clientId:process.env.REACT_APP_AUTH0_CLIENT_ID!
}

const audience = "https://nba-api-one.azurewebsites.net/api"
const scope = "read:current_user"

ReactDOM.render(
  <Auth0Provider
    domain={auth0Object.domain}
    clientId={auth0Object.clientId}
    redirectUri="http://localhost:3000/dashboard/Players"
    audience={`${audience}`}
    scope={scope}
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




