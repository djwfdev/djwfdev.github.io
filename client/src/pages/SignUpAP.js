import React, {useEffect, useState} from 'react';
import { 
  Grid, CssBaseline, FormControlLabel, Container, Avatar, Button, TextField, 
  Checkbox, Link, Box, Typography, ThemeProvider, RadioGroup, Radio
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Theme } from '../components/Theme'; 
import Footer from '../components/Footer';
import axios from '../api/axios';

const MIN_LENGTH = 10; 
const SIGNUP_URL = '/signup/assistance-professional';

function setUser(user) {
  localStorage.setItem('assistance-professional', JSON.stringify(user));
}

export default function SignUpAP() {
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(new Date());
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
  
    const user = ({
      firstName,
      lastName,
      gender,
      dob,
      email, 
      password
    });
    setUser(user);
    axios.post(SIGNUP_URL, user); 
  }

  return (
    <>
    <ThemeProvider theme={Theme}>
      <Container component="main" maxWidth="xs" sx={{height: '90vh'}}>
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={e => setFName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={e => setLName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <RadioGroup
                row
                onChange={e => setGender(e.target.value)}
                >
                  <FormControlLabel value="female" control={<Radio />} label=" Female" />
                  <FormControlLabel value="male" control={<Radio />} label=" Male" />
                  <FormControlLabel value="other" control={<Radio />} label=" Other" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  label="Date of birth"
                  name="dob"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  autoComplete="date-of-birth"
                  onChange={e => setDOB(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone-number"
                  error={phoneNumber.length !== MIN_LENGTH}
                  helperText={phoneNumber.length !== MIN_LENGTH ? 'Phone number must be 10 digits' : ''}
                  inputProps={{ maxLength: MIN_LENGTH }}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => setPwd(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                padding: "8px 20px", 
                mt: 3, 
                mb: 2 
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    <Footer />
    </>
  );
}