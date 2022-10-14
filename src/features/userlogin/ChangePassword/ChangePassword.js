import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../../userlogin/ChangePassword/action';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

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

const theme = createTheme();

export default function ChangePassword(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  
  const [values, setValues] = useState(
    { username: '', userpassword: '',newpassword:'',confirmnewpassword:'' }
  );
 
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]:  value }));
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const processPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = "";
    Promise.all([responsedata.payload]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      console.log('resolved status',v[0].status);
      console.log('resolved payload',responsePayLoad.success); 
      if(responsePayLoad != null && JSON.parse(responsePayLoad).success){
        //alert('Successfully Changed Password');
        setShowSuccess(true);
      }
      else{
        //alert(' Changed Password Failed');
        setShowFailure(true);
      }
    })
    return {'status': responseStatus,'payload':responsePayLoad}
  }

  const handleSubmit = (event) => {
    //event.preventDefault();
    console.log("text field value ",values.username);
    const formdata = new FormData();
    formdata.append("username", values.username);
    formdata.append("userpassword", values.userpassword);
    formdata.append("newpassword", values.newpassword);
    formdata.append("confirmnewpassword", values.confirmnewpassword);
    //Below code is to fire POST REST API call
    const responsedata = dispatch(changePassword(formdata.get('username'), formdata.get('userpassword'), formdata.get('newpassword'), formdata.get('confirmnewpassword')));
    processPayLoad(responsedata);
  };

  const handleLoginSubmit = (event) => {
    navigate('/signin')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
        {!showSuccess && !showFailure &&
          <Box sx={{ mt: 1 }} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username" 
              name="username"
              autoComplete="username"
              autoFocus
              textfieldname="username"
              onChange={set('username')}
              value={values.username} 
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Old Password"
              type="password"
              id="password"
              textfieldname="userpassword"
              autoComplete="current-password"
              onChange={set('userpassword')}
              value={values.userpassword}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="newpassword"
              label="New Password"
              type="password"
              id="newpassword"
              textfieldname="newpassword"
              autoComplete="current-newpassword"
              onChange={set('newpassword')}
              value={values.newpassword}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="confirmnewpassword"
              label="Confirm New Password"
              type="password"
              id="confirmnewpassword"
              textfieldname="confirmnewpassword"
              autoComplete="current-confirmnewpassword"
              onChange={set('confirmnewpassword')}
              value={values.confirmnewpassword}
            />
            <Button
              type="submit"
              name="submit"
              value="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Change Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#/app/forgotpassword" variant="body2">
                  Forgot password ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/#/app/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          }
          {showSuccess &&
          <Box sx={{ mt: 1 }} >
           <Typography component="h3" variant="string">
                Your password changed successfully. Please use that and login.
            </Typography>
            <Button
              type="button"
              name="button"
              value="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLoginSubmit}
            >
             Login
            </Button>
          </Box>
          }
          {showFailure &&
          <Box sx={{ mt: 1 }} >
           <Typography component="h3" variant="string">
                Password change failed.
            </Typography>
            <Button
              type="button"
              name="button"
              value="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLoginSubmit}
            >
             Login
            </Button>
          </Box>
          }
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}