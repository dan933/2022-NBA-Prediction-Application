import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LogedOutPlayersSection from './LogedOutPlayersSection';



const linkStyle = {
  textDecoration: "none",
  color: 'white'
};

function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  const ButtonHTML = () => {

    if (isAuthenticated && !isLoading) {
      return (
        <Button variant="contained" sx={{ 'margin': 2 }}>
          <Link style={linkStyle} to="/dashboard/Players">Launch Application</Link>
        </Button>
      )
      
    } else if (!isAuthenticated && !isLoading) {
      return (
        <Button variant="contained" sx={{ 'margin': 2 }}>
          <Link style={linkStyle} to="/dashboard/Players">Login</Link>
        </Button>
      )

    }
  }
  
  
  
  
  return (
    <>
      {!isLoading &&
        <>
        {ButtonHTML()}
        < LogedOutPlayersSection />
        </>
      }
      
    </>
  );
}

export default LoginPage;
