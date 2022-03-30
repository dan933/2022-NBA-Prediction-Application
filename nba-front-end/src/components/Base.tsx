import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../logo.svg';

function BasePage() {
  return (
    <div>
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Dod & Gy branding here
      </p>
    </header>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default BasePage;