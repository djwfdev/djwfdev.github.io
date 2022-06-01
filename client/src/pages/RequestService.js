import React, {useEffect, useState} from 'react';
import { 
  AppBar, Container, Avatar, Button, TextField, 
  Link, Box, Typography, ThemeProvider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Theme } from '../components/Theme'; 
import Footer from '../components/Footer';

const MIN_LENGTH = 10; 

function setUser(user) {
  sessionStorage.setItem('member', JSON.stringify(user));
}

export default function RequestService() {
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
  
    const user = ({
      firstName,
      lastName,
      phoneNumber
    });
    setUser(user);
  }

  // const searchMemberList = () => {
  //   if(firstName.trim()){
  //     // dispatch(getMembersBySearch({searchFirstName, searchLastName, searchPhoneNumber}));
  //   } else {
  //     alert("No member found, incorrect details?")
  //   }
  // }

  return (
    <>
    <ThemeProvider theme={Theme}>
      <Container sx={{
        width: '100%', 
        backgroundImage: 'url(/images/brokendown.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Container sx={{
          width: '100%', 
          display: 'flex', 
          height: '90vh', 
          alignItems: 'center',
          fontSize: '3rem'}}>
          <Container sx={{width: '50%'}}>
              <AppBar style={{borderRadius: 15, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} position="static" color="inherit">
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Are you a member? Log in below
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{margin: 2, width: '75%'}}>
                    <TextField
                      margin="normal"
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={e => setFName(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={e => setLName(e.target.value)}
                    />
                    <TextField
                      margin="normal"
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
                      Search
                    </Button>
                    <Link href="/service-request-customer" variant="body2">
                      {"Not a member? Request service here"}
                    </Link>
                  </Box>
              </AppBar> 
          </Container>
        </Container>
      </Container> 
    </ThemeProvider>
    <Footer />
    </>
  );
}