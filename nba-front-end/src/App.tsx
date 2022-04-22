import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Menu';
import logo from './logo.svg';
import './App.css';
import RouteConfig from './routes/Routes';

function App() {
  return (
  <div className="App">
    <RouteConfig/>
    {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Dod & Gy branding here
      </p>
    </header>
    <Dashboard></Dashboard> */}
  </div>
  );
}


export default App;
