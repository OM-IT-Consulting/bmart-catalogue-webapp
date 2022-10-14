import React, { useLayoutEffect,useState,useEffect} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetailsAPI,getNotificationMessages } from '../BaseLayout/action';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NestedMenuList from '../../../components/NestedMenuList';
import { useNavigate } from "react-router-dom";
import Profile from '../Profile';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const BaseLayout = ({children}) => {
  const [open, setOpen] = React.useState(true);
  let navigate = useNavigate();
  
  const [values, setValues] = useState(
    { loading: '',notificationPayLoad: []}
  );

  const setLoading = loadValue => {
    setValues({loading: loadValue});
  };
 
  const setNotificationPayLoad = payLoadValue => {
    setValues({notificationPayLoad: payLoadValue});
  };

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]:  value }));
    }
  };

  const dispatch = useDispatch();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useLayoutEffect(() => {
    const userString = sessionStorage.getItem("userdetails");
    if(userString == null){
      const responsedata = dispatch(getUserDetailsAPI());
      processUserDetailsPayLoad(responsedata);
    }
  }, [""]);

  const processUserDetailsPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = "";
    Promise.all([responsedata.payload]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      //const userObj = JSON.parse(responsePayLoad);
      //Store the userDetails in session Storage
      //This may be required in the application
      sessionStorage.setItem("userdetails", JSON.stringify(responsePayLoad));
      setLoading(false);
      //If password system generated then force the user to change the password
      if(responsePayLoad.isPasswordSystemGenerated){
        navigate('/changepassword')
      }
      console.log('isPasswordSystemGenerated',responsePayLoad.isPasswordSystemGenerated);
      const responsedata1 = dispatch(getNotificationMessages());
      processPayLoad(responsedata1);
    })
    return {'status': responseStatus,'payload':responsePayLoad}
  }

  const processPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = "";
    Promise.all([responsedata.payload]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      console.log('resolved status',v[0].status);
      console.log('resolved payload',responsePayLoad); 
      if(responsePayLoad != null && JSON.parse(responsePayLoad).success){
        var notificationmessageslistarray = JSON.parse(responsePayLoad).message;
        setNotificationPayLoad(notificationmessageslistarray);
      }
    })
    return {'status': responseStatus,'payload':responsePayLoad}
  }

  useEffect(() => {
    const responsedata = dispatch(getNotificationMessages());
    processPayLoad(responsedata);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationOpen = Boolean(anchorEl);

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Reference Application
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={(values.notificationPayLoad != null)?values.notificationPayLoad.length:"0"} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {values.notificationPayLoad != null && values.notificationPayLoad.length > 0 &&
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={notificationOpen}
              onClose={handleNotificationClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Divider />
              {values.notificationPayLoad != null && values.notificationPayLoad.length >0 && values.notificationPayLoad.map(({ count, heading, content, notificationlabel }) => (
              <MenuItem  key={count} onClick={handleNotificationClose}>
                 <React.Fragment>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={notificationlabel} />
                    </ListItemAvatar>
                    <ListItemText primary={heading} secondary={content} />
                  </ListItem>
                </React.Fragment>
              </MenuItem>
              ))}
            </Menu>
            }
            <Profile />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <NestedMenuList/>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  {children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default BaseLayout;
