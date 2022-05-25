import { Button } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconMenu } from '../images/top-nav-bar-img.svg'

const linkStyle = {
  textDecoration: "none",
  color: 'white'
};

function DefaultPage() {

  console.log(process.env);
  return (
    <div>
      <div className='Background-Color'>
        <header className="App-header">
  {/* ----------------------- nba image for top nav bar --------------- */}
        <IconMenu display= 'block'/>
        </header>
      </div>
      <Button variant="contained" sx={{'margin':2}}>
        <Link style={linkStyle} to="/dashboard/players">Launch Application</Link>
      </Button>
    </div>
  );
}

export default DefaultPage;