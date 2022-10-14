import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../userlogin/SignUp/action';
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

export default function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: '',newpassword:'',confirmnewpassword:'',email: '',firstname: '',lastname: '',
  });

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const processPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = "";
    Promise.all([responsedata.payload]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      console.log('resolved status',v[0].status);
      console.log('resolved payload',responsePayLoad); 
      if(responsePayLoad != null && JSON.parse(responsePayLoad).success){
        //alert('Successfully Changed Password');
        setShowSuccess(true);
        setErrorMessage('');
      }
      else{
        //alert(' Changed Password Failed');
        setShowFailure(true);
        setErrorMessage(JSON.parse(responsePayLoad).message);
      }
    })
    return {'status': responseStatus,'payload':responsePayLoad}
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    formdata.append("username", values.username);
    formdata.append("newpassword", values.newpassword);
    formdata.append("confirmnewpassword", values.confirmnewpassword);
    formdata.append("emailid", values.emailid);
    formdata.append("firstname", values.firstname);
    formdata.append("lastname", values.lastname);
    const responsedata = dispatch(registerUser(formdata.get('username'),formdata.get('newpassword'),formdata.get('confirmnewpassword'),formdata.get('emailid'),formdata.get('firstname'),formdata.get('lastname')));
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
            Sign up
          </Typography>
          {showSuccess &&
          <Box sx={{ mt: 1 }} >
           <Typography component="h3" variant="string">
                Your user registration is successfull. Please use that and login.
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
           <Typography variant="errortext">
                {errorMessage}
            </Typography>
          </Box>
          }
          {!showSuccess &&
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="emailid"
                label="Email Address"
                id="emailid"
                textfieldname="emailid"
                autoComplete="current-emailid"
                onChange={set('emailid')}
                value={values.emailid}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={set('firstname')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  onChange={set('lastname')}
                  autoComplete="family-name"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/#/app/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          }
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}