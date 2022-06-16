import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LogedOutPlayersSection from './LogedOutPlayersSection';
import HeaderImage from '../../images/top-nav-bar-img.png'
import Copyright from "../Menu/Copyright"
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

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
      <Box sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[300]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: 'auto'            
      }}>
        
        
        
        
        <header className="App-header">
            {/* ----------------------- nba image for top nav bar --------------- */}
            <img src={HeaderImage} alt="Header" loading="lazy" />
        </header>
        {/* ----------------------- Blue nav bar --------------- */}
        <AppBar position="sticky" sx={{mb: 2}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SportsBasketballIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NBA Predictions
            </Typography>
            <SportsBasketballIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NBA Predictions
            </Typography>    
          </Toolbar>
        </Container>
      </AppBar>
        {ButtonHTML()}
        < LogedOutPlayersSection />        
        <Copyright sx={{ pt: 4 }} />
        <br></br>
        </Box>
      }
      
    </>
  );
}

export default LoginPage;
