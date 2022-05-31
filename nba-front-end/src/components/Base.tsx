import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../logo.svg';
import { height } from '@mui/system';

function BasePage() {
  return (
    <div>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}        
      <Outlet/>
    </div>
  );
}

export default BasePage;