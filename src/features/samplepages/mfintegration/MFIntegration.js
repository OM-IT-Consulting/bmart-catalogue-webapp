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

const Button1 = () => (
  <button>Microfront End2 Loaded Button</button>
);

//export default Button;

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

  return (
    <Button1/>
  )
};