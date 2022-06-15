import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import Link from "@mui/material/Link"
import Grid from '@mui/material/Grid';
// imported the router Link as "RouterLink" because a MaterialUI Link had already been imported for use in the Copyright component. there cannot be duplicate imports
import { Outlet, useNavigate, Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { makeStyles } from "@material-ui/core";
import HeaderImage from '../../images/top-nav-bar-img.png'
import UserInformationMenu from './UserInformationMenu/UserInformationMenu';
import { withAuthenticationRequired } from '@auth0/auth0-react';

// type Anchor determines the direction for the drawer. you can use: left, right, top, bottom
type Anchor = 'left';


function Copyright(props: any) {
  // TODO: update link
  // UPDATED LINK TO GOV COPYRIGHT LAW WEBSITE
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Site created by Swinburne Team West; '}
      <Link color="inherit" target="_blank" href="https://github.com/dan933/2022-NBA-Prediction-Application">
        user contributions
      </Link>{' '}
      
      {'licensed under Copyright © '}
      <Link color="inherit" target="_blank" href="https://www.alrc.gov.au/publication/genes-and-ingenuity-gene-patenting-and-human-health-alrc-report-99/28-copyright-and-databases/copyright-law/">
        Dod & Gy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ResponsiveAppBar = () => {
  
  // defines and adds style for the nav bar - removes blue highlighted text which is the default style
  const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit' },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }));
  const classes = useStyles();

  // declares and sets a Boolean state for an open or closed drawer. default state is set to "false" = closed
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  // this sets the layout for the drawer. 
  const list = (anchor: Anchor) => (
    <Box
      // '230px' sets the width of the drawer container
      sx={{ width: anchor === 'left' ? '230px' : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        <ListItem button disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChevronLeftIcon />
            </ListItemIcon>
            <ListItemText primary={""} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <RouterLink to="/dashboard/players" className={classes.link}>
          <ListItem button disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Players"} />
            </ListItemButton>
          </ListItem>
        </RouterLink>
        <RouterLink to="/dashboard/teams" className={classes.link}>
          <ListItem button disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={"Teams"} />
            </ListItemButton>
          </ListItem>
        </RouterLink>
        <RouterLink to="/dashboard/prediction" className={classes.link}>
          <ListItem button disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              <ListItemText primary={"Predictions"} />
            </ListItemButton>
          </ListItem>
        </RouterLink>
      </List>
      <Divider />
    </Box>
  );

  // useNavigate is similar to "Link to=(route)" but can also be used for onClick events.
  const navigate = useNavigate()


  return (
    <>
      <header className="App-header">
{/* ----------------------- nba image for top nav bar --------------- */}
        <img src={HeaderImage} alt="Header" loading="lazy" />
      </header>
      <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[300]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: 'auto'            
          }}
        >
      <AppBar position="sticky">
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

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={toggleDrawer(anchor, true)}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </Box>
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

            

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate(`/dashboard/players`)}
                sx={{ my: 2, color: 'white', display: 'block', left: 15, top: 1.5 }}
              >
                Players
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate(`/dashboard/teams`)}
                sx={{ my: 2, color: 'white', display: 'block', left: 30, top: 1.5 }}
              >
                Teams
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate(`/dashboard/prediction`)}
                sx={{ my: 2, color: 'white', display: 'block', left: 45, top: 1.5}}
              >
                Predictions
              </Button>
            </Box>



            <Box marginLeft={'auto'}>
              <UserInformationMenu/>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* the <Outlet /> component allows the page to display the various tables*/}
      <Outlet />
      <Grid item xs={12} md={12} lg={12}>
        <Copyright sx={{ pt: 4 }} />
      {/* "br" adds space between copyright mark and bottom of page */}
        <br></br>
      </Grid>
      </Box>
    </>
  );
};

export default withAuthenticationRequired(ResponsiveAppBar, {onRedirecting:() => <h1>Loading Please Wait</h1>,})
