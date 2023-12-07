import { Link } from "react-router-dom";
import { TopBarHome } from "../../common/top-bar-home";
import React, { useState } from 'react';
import { Container, Box, TextField, Checkbox, FormControlLabel, Button, Typography, Paper } from '@mui/material';
import registerImage from '../../assets/images/register.png';

export const SignUpPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate that all fields are filled and terms are checked
    if (
      companyName.trim() === '' ||
      title.trim() === '' ||
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      reEnterPassword.trim() === '' ||
      !termsChecked
    ) {
      alert('Please fill in all fields and accept the terms before submitting.');
      return;
    }

    // Additional validation logic can be added here
    // If all validation passes, proceed with sign-up logic
    console.log('Company Name:', companyName);
    console.log('Title:', title);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Re-enter Password:', reEnterPassword);
    console.log('Terms Checked:', termsChecked);
  };

  return (
    <Container maxWidth="false" disableGutters sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBarHome />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', width: '50%' }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              autoComplete="companyName"
              autoFocus
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Your Title"
              name="title"
              autoComplete="title"
              sx={{ marginRight: '15px' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                sx={{ width: 'calc(50% - 7.5px)' }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                sx={{ width: 'calc(50% - 7.5px)' }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="reEnterPassword"
              label="Re-enter Password"
              type="password"
              id="reEnterPassword"
              autoComplete="new-password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="termsChecked" color="primary" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />}
              label="I have read the terms"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Sign Up
            </Button>
            <Link component={Link} to="/login" variant="body2" sx={{ display: 'block', mt: 2 }}>
              Already have an account? Log In
            </Link>
          </Box>
        </Paper>
        <Box sx={{ width: '50%', height: '100%', backgroundImage: `url(${registerImage})`, backgroundSize: 'cover' }} />
      </Box>
    </Container>
  );
};

export default SignUpPage;
