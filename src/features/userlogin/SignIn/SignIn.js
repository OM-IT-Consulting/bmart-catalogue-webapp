import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../../userlogin/SignIn/action';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

export default function SignIn(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const INITIAL_STATE = { values:{username: 'test1', userpassword: 'test1' } };
  
  const [values, setValues] = useState(
    { username: '', userpassword: '' }
  );
 
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]:  value }));
    }
  };

  const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const API_PORT_NO = process.env.REACT_APP_API_PORT_NO;
  const API_ENDPOINT = "api/auth/signin";
  const API_URL = `${REACT_APP_API_ENDPOINT}`+":"+`${API_PORT_NO}`+"/api/auth/signin";


  const processPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = "";
    Promise.all([responsedata.payload]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      console.log('resolved status',v[0].status);
      console.log('resolved payload',responsePayLoad); 
      if(!responsePayLoad.success ){
        alert('Invalid Credentials');
      }
      else{
        navigate('/dashboard')
      }
    })
    return {'status': responseStatus,'payload':responsePayLoad}
  }

  const handleSubmit = (event) => {
    sessionStorage.clear();
    //event.preventDefault();
    console.log("text field value ",values.username);
    const formdata = new FormData();
    formdata.append("username", values.username);
    formdata.append("userpassword", values.userpassword);
    //Below code is to fire POST REST API call
    //const responsedata = dispatch(authenticateUser(formdata.get('username'), formdata.get('userpassword')));
    //processPayLoad(responsedata);
  };

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
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }} >
            <form method="post" name="loginform" action={API_URL} onSubmit={handleSubmit}>
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
              label="Password"
              type="password"
              id="password"
              textfieldname="userpassword"
              autoComplete="current-password"
              onChange={set('userpassword')}
              value={values.userpassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              name="submit"
              value="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            </form>
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
            <Grid container>
              <Grid item xs>
                <Link href="#/app/changepassword" variant="body2">
                  Change password
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}