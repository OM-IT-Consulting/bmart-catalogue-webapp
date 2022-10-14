import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { sendOTPEmail } from '../../userlogin/ForgotPassword/action';

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

export default function ForgotPassword(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  const [values, setValues] = useState(
    { username: '', emailid: '' }
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
      console.log('resolved payload',responsePayLoad); 
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
    formdata.append("emailid", values.emailid);
    //Below code is to fire POST REST API call
    const responsedata = dispatch(sendOTPEmail(formdata.get('emailid'),formdata.get('username')));
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
            Forgot Password
          </Typography>
          {!showSuccess && !showFailure &&
          <Box sx={{ mt: 1 }} >
            <TextField
              margin="normal"
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
            <Grid item xs={12}>
                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    <Button
                        variant="outlined"
                        sx={{
                            cursor: 'unset',
                            m: 2,
                            py: 0.5,
                            px: 7,
                            borderColor: `grey !important`,
                            color: `grey!important`,
                            fontWeight: 500,
                            borderRadius: `9px`
                        }}
                        disableRipple
                        disabled
                    >
                        OR
                    </Button>
                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                </Box>
            </Grid>
            <TextField
              margin="normal"
              fullWidth
              name="emailid"
              label="Email ID"
              type="emailid"
              id="emailid"
              textfieldname="emailid"
              autoComplete="current-emailid"
              onChange={set('emailid')}
              value={values.emailid}
            />
            <Button
              type="button"
              name="button"
              value="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Send Password To Email
            </Button>
            <Grid container>
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
                Your one time password sent to your email successfully. Please use that and login.
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
                Application Error in sending password through email.
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