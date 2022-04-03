import { Button } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: "none",
  color: 'white'
};

function DefaultPage() {
  return (
    <div>
      <Button variant="contained" sx={{'margin':2}}>
        <Link style={linkStyle} to="/dashboard/Players">Launch Application</Link>
      </Button>
    </div>
  );
}

export default DefaultPage;