import { TopBarHome } from "../../common/top-bar-home";
import React, { useState } from 'react';
import { Container, Box, TextField, Checkbox, FormControlLabel, Button, Typography, Link, Paper} from '@mui/material';
import yourImage from '../../assets/images/login.png';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (    
    <Container maxWidth="false" disableGutters sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBarHome />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ width: '50%', height: '100%', backgroundImage: `url(${yourImage})`, backgroundSize: 'cover' }} />
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', width: '50%' }}>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Log In
            </Button>
            <Link href="#" variant="body2" sx={{ display: 'block', mt: 2 }}>
              Forgot password?
            </Link>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
