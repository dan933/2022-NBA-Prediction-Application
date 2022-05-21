import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LogedOutPlayersSection from './LogedOutPlayersSection';



const linkStyle = {
  textDecoration: "none",
  color: 'white'
};

function LoginPage() {
  return (
    <div>
      <Button variant="contained" sx={{'margin':2}}>
        <Link style={linkStyle} to="/dashboard/Players">Login</Link>        
      </Button>
      <LogedOutPlayersSection/>
    </div>
  );
}

export default LoginPage;
