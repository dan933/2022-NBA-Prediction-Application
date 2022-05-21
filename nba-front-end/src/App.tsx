import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Menu';
import logo from './logo.svg';
import './App.css';
import RouteConfig from './routes/routes';
import LoginButton from './components/LoginPage/LoginButton';
import LogoutButton from './components/LoginPage/LogoutButton';
import LoginPage from './components/LoginPage/LoginPage';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {    
    isAuthenticated,
    isLoading,    
    loginWithRedirect
  } = useAuth0();
  
  return (
    <>
      {(isLoading && !isAuthenticated) && (<>Page is loading</>)}
      {(!isLoading && isAuthenticated ) && 
        <div className="App">
          <RouteConfig />
        </div>}
        {(!isLoading && !isAuthenticated) && loginWithRedirect()}
    </>
  );
}


export default App;

