
import * as React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutButton from './LogoutButton';

const linkStyle = {
  textDecoration: "none",
  color: 'black'
};

export const mainListItems = (
  <React.Fragment>
    <Link style={linkStyle} to="/dashboard/players">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
          <ListItemText primary="Players" />
      </ListItemButton>
    </Link>
    <Link style={linkStyle} to="/dashboard/teams">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
          <ListItemText primary="Team Creation" />
      </ListItemButton>
    </Link>
    <Link style={linkStyle} to="/dashboard/prediction">
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Predictions" />
    </ListItemButton>
    </Link>
    <LogoutButton/>
  </React.Fragment>
);

