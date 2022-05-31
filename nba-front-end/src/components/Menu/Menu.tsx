import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
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
import { ReactComponent as HeaderImage } from '../../images/top-nav-bar-img.svg'
import { mainListItems } from './listItems';
import { withAuthenticationRequired,  useAuth0} from '@auth0/auth0-react';
import UserInformation from './UserInformation/UserInformation';

// type Anchor determines the direction for the drawer. you can use: left, right, top, bottom
type Anchor = 'left';
// sets the menu options for profile menu. they currently have no function
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Copyright(props: any) {
  // TODO: update link
  // UPDATED LINK TO GOV COPYRIGHT LAW WEBSITE
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://www.alrc.gov.au/publication/genes-and-ingenuity-gene-patenting-and-human-health-alrc-report-99/28-copyright-and-databases/copyright-law/">
        Dod & Gy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const ResponsiveAppBar = () => {

  const { logout, user } = useAuth0();

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

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       overflow:'hidden',
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );


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
              <ListItemText primary={"Team Creation"} />
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

  // sets events for profile menu
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // useNavigate is similar to "Link to=(route)" but can also be used for onClick events.
  const navigate = useNavigate()


  return (
    <>
      <div className='Background-Color'>
        <header className="App-header">
  {/* ----------------------- nba image for top nav bar --------------- */}
        <HeaderImage display= 'block'/>
        </header>
      </div>
      <Box
    // <ThemeProvider theme={mdTheme}>
    //   <Box sx={{ display: 'flex' }}>
    //     <CssBaseline />
    //     <Drawer variant="permanent" open={open}>
    //       <Toolbar
    //         sx={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'flex-end',
    //           px: [1],
    //         }}
    //       >
    //         <IconButton onClick={toggleDrawer}>
    //           <ChevronLeftIcon />
    //         </IconButton>
    //       </Toolbar>
    //       <Divider />
    //       <List>
    //         <UserInformation/>
    //       </List>
    //       <Divider />
    //       <List component="nav">
    //         {mainListItems}
    //         <Divider sx={{ my: 1 }} />
    //       </List>
    //     </Drawer>
    //     <AppBar open={open} position="absolute" sx={{top: 250}}>
    //       <Toolbar
    //         sx={{
    //           pr: '24px', // keep right padding when drawer closed
    //         }}
    //       >
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           aria-label="open drawer"
    //           onClick={toggleDrawer}
    //           sx={{
    //             marginRight: '36px',
    //             ...(open && { display: 'none' }),
    //           }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography
    //           component="h1"
    //           variant="h6"
    //           color="inherit"
    //           noWrap
    //           sx={{ flexGrow: 1 }}
    //         >
    //           NBA Prediction Application
    //         </Typography>
    //         {/* <IconButton color="inherit">
    //           <Badge badgeContent={4} color="secondary">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton> */}
    //       </Toolbar>
    //     </AppBar>
    //     <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
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
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Players
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate(`/dashboard/teams`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Team Creation
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate(`/dashboard/prediction`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Predictions
              </Button>
            </Box>



            <Box marginLeft={'auto'}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{user?.email}</Typography>
                  </MenuItem>
                  <MenuItem onClick={ () => {logout()} }>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>

              </Menu>
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
