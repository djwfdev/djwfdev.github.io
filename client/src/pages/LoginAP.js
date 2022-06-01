import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { 
  Grid, CssBaseline, FormControlLabel, Avatar, Button, TextField, 
  Checkbox, Link, Box, Typography, ThemeProvider, Paper, Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Theme } from '../components/Theme';  
import Footer from '../components/Footer';

const LOGIN_URL = '/assistance-professionals';

function setUser(user) {
  localStorage.setItem('assistance-professional', JSON.stringify(user));
}

export default function LoginAP() {

  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [errorMessage, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = `${email}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');

    var config = {
      headers: { 
        'Authorization': 'Basic '+ encodedToken, 
        'Content-Type': 'application/json'
      }
    };

    const data = ({
      email,
      password
    }); 

    axios.get(LOGIN_URL, data, config)
      .then(function (response) {
        response.data.forEach(user => { 
          if (user.email === email && user.password === password){
            setUser(user); 
            setSuccess(true);
          } else {
            setErrMsg("Cannot find user: Incorrect email or password!"); 
          }
        })
      })
      .catch(function (error) {
        console.log(error);
        setSuccess(false); 
      });
  }

  return (
    <>
    <ThemeProvider theme={Theme}>
      {success ? (
        <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <a href="/">Go to Home</a>
            </p>
        </section>
      ) : (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography> <br/>
            {errorMessage ? (<Alert severity="error">{errorMessage}</Alert>) : ("")}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error={errorMessage ? true : false}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={errorMessage ? true : false}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                Log in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/images/roadsideassistance.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    )} 
    </ThemeProvider>
    <Footer />
    </>
  );
}