// material-ui
import { Typography } from '@mui/material';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React, { useEffect,useState} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "../../../translations/i18n";
import { useTranslation } from "react-i18next";
import { serviceConnector } from '../../../services/api';
import { useNavigate } from "react-router-dom";

// project import
import MainCard from '../../../components/MainCard';
import BaseLayout from '../../common/BaseLayout';

export default function SamplePage(props) {

  const theme = createTheme();
  let navigate = useNavigate();

  const INITIAL_STATE = { values:{formvalue1: 'test1', formvalue2: 'test1' } };
  
  const [values, setValues] = useState(
    { formvalue1: '', formvalue2: '',formvalue1_error_text: false,formvalue2_error_text:false,formvalue1_helper_text: '',formvalue2_helper_text:''}
  );
 
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]:  value }));
    }
  };

  const setFormValues = (name,value) => {
      setValues(oldValues => ({...oldValues, [name]:  value }));
  };

  const { t } = useTranslation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    const responsedata =  serviceConnector('/app/api1', 'POST',{}, {});
    processPageLoadPayLoad(responsedata);
  }, []);

  const processPageLoadPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = ""; 
    Promise.all([responsedata]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      console.log('resolved status',v[0].status);
      console.log('resolved payload',responsePayLoad); 
      if(responsePayLoad != null && JSON.parse(responsePayLoad).success){
        //setShowSuccess(true);
      }
      else{
        //setShowFailure(true);
      }
    })
    return {'status': responseStatus,'payload':responsePayLoad}
  }

  const handleSubmit = (event) => {
    //event.preventDefault();
    console.log("form value 1",values.formvalue1);
    const formdata = new FormData();
    formdata.append("formvalue1", values.formvalue1);
    formdata.append("formvalue2", values.formvalue2);
    //Below code is to fire POST REST API call
    const responsedata = serviceConnector('/app/api2', 'POST',{}, { "formValue1" : formdata.get('formvalue1'), "formValue2" : formdata.get('formvalue2') });
    processPayLoad(responsedata);
  };

  const processPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = ""; 
    Promise.all([responsedata]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      console.log('resolved status',v[0].status);
      console.log('resolved payload',responsePayLoad); 
      if(responsePayLoad != null && JSON.parse(responsePayLoad).success){
        setShowSuccess(true);
      }
      else{
        setShowFailure(true);
      }
    })
    return {'status': responseStatus,'payload':responsePayLoad}
  }

  const handleFormSubmit = (event) => {
    if(validateForm()){
      handleSubmit(event);
    }
  };

  const validateForm = (event) => {
    let isValidationSuccessful = true;
    if (values.formvalue1 === "") {
      setFormValues('formvalue1_error_text',true);
      setFormValues('formvalue1_helper_text','Please enter');
      isValidationSuccessful = false;
    }else{
      setFormValues('formvalue1_error_text',false);
      setFormValues('formvalue1_helper_text','');
    }
    if (values.formvalue2 === "") {
      setFormValues('formvalue2_error_text',true);
      setFormValues('formvalue2_helper_text','Please enter');
      isValidationSuccessful = false;
    }else{
      setFormValues('formvalue2_error_text',false);
      setFormValues('formvalue2_helper_text','');
    }
    return isValidationSuccessful;
  };

  const handleDashBoardSubmit = (event) => {
    navigate('/dashboard')
  }

  return (
    <BaseLayout>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <MainCard title="Form Input Page">
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
    <Box sx={{ bgcolor: '#cfe8fc'}} >
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" align="left">
           {t("welcome")} Form Input Page 
          </Typography>
          <Divider />
          {showFailure &&
          <Box sx={{ mt: 1 }} >
           <Typography  variant="string" color="error">
                Password change failed.Please try again.
            </Typography>
          </Box>
          }
          {!showSuccess &&
            <Box sx={{ mt: 1 }} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="element1"
              label="Form Element 1" 
              name="formvalue1"
              autoComplete="formvalue1"
              autoFocus
              textfieldname="formvalue1"
              onChange={set('formvalue1')}
              value={values.formvalue1}
              error={values.formvalue1_error_text}
              helperText={values.formvalue1_helper_text}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="element2"
              label="Form Element 2" 
              name="formvalue2"
              autoComplete="formvalue2"
              autoFocus
              textfieldname="formvalue2"
              onChange={set('formvalue2')}
              value={values.formvalue2}
              error={values.formvalue2_error_text}
              helperText={values.formvalue2_helper_text}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="button"
              name="button"
              value="button"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleFormSubmit}
            >
              Submit 
            </Button>
            <Button  variant="contained" sx={{ mt: 3, ml: 1 }}>
              Cancel
            </Button>
            </Box>
            </Box>
          }
          {showSuccess &&
          <Box sx={{ mt: 1 }} >
           <Typography component="h3" variant="string">
                Your form submitted successfully.
            </Typography>
            <Button
              type="button"
              name="button"
              value="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleDashBoardSubmit}
            >
             Go to DashBoard
            </Button>
          </Box>
          }
    </Paper>
    </Box>
    </Container>
    </MainCard>
    </ThemeProvider>
  </BaseLayout>
  )
};
