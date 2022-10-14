// material-ui
import { Typography } from '@mui/material';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// project import
import MainCard from '../../../components/MainCard';
import BaseLayout from '../../common/BaseLayout';

const theme = createTheme();

const SamplePage = () => (
    <BaseLayout>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <MainCard title="Sample Card">
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
    <Box sx={{ bgcolor: '#cfe8fc'}} >
        <Paper variant="outlined" elevation="16" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h9" align="left">
            Checkout
          </Typography>
          <Divider />
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
              value='' 
            />
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
              value='' 
            />
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
              value='' 
            />
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
              value='' 
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
             <Button  type="submit"
              name="submit"
              value="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
                      Submit
             </Button>

            <Button  variant="contained" sx={{ mt: 3, ml: 1 }}>
                      Cancel
            </Button>
        </Box>
    </Paper>
    </Box>
    </Container>
    </MainCard>
    </ThemeProvider>
  </BaseLayout>
);

export default SamplePage;
