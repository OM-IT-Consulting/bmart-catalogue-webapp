import React, { useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { placeOrder} from '../../../features/samplepages/pymtintegration/action';
import { useTranslation } from "react-i18next";
import BaseLayout from '../../common/BaseLayout/BaseLayout';
import "../../../translations/i18n";

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

export default function PymtIntegration(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();

  const INITIAL_STATE = { values:{stateformvalue1: 'test1', stateformvalue2: 'test1' } };
  
  const [values, setValues] = useState(
    { stateformvalue1: '', stateformvalue2: '' }
  );
 
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]:  value }));
    }
  };


  const processPayLoad = (responsedata) => {
    const responseStatus = "";
    const responsePayLoad = "";
    let orderId = "";
    Promise.all([responsedata.payload]).then(function(v) {
      const responseStatus = v[0].status;
      const responsePayLoad = v[0].payload;
      console.log('resolved status',v[0].status);
      console.log('resolved payload',responsePayLoad); 
      orderId = responsePayLoad.id;

      //Razor Pay call
      const options = {
        key: "rzp_live_amN2y1dIXDqOwy", // Enter the Key ID generated from the Dashboard
        amount: values.formvalue1*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Test Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Test Name",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "My Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      paymentObject.open();

    })
  }

  const handleClick = (event) => {
    //event.preventDefault();
    console.log("form value 1",values.formvalue1);
    const formdata = new FormData();
    formdata.append("formvalue1", values.formvalue1);
    formdata.append("formvalue2", values.formvalue2);
    //Below code is to fire POST REST API call
    const responsedata = dispatch(placeOrder(formdata.get('formvalue1'), formdata.get('formvalue2')));
    processPayLoad(responsedata);

  };

  return (
    <BaseLayout>
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
            {t("welcome")} to the Payment Page
          </Typography>
          <Box sx={{ mt: 1 }} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="element1"
              label="Amount" 
              name="formvalue1"
              autoComplete="formvalue1"
              autoFocus
              textfieldname="formvalue1"
              onChange={set('formvalue1')}
              value={values.formvalue1} 
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="formvalue2"
              label="Currency"
              id="element2"
              textfieldname="formvalue2"
              autoComplete="current-password"
              onChange={set('formvalue2')}
              value={values.formvalue2}
            />
            <Button
              type="button"
              name="button"
              value="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Pay 
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </BaseLayout>
  );
}