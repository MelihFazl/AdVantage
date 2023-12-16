import { TopBarHome } from "../../common/top-bar-home";
import React, { useState } from "react";
import {
  Grid,
  Container,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import yourImage from "../../assets/images/login.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if email and password are filled
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in both email and password fields.");
      return;
    }

    // Handle the login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    navigate("/team-member");
  };

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <TopBarHome />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            backgroundImage: `url(${yourImage})`,
            backgroundSize: "cover",
          }}
        />
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            width: "50%",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              size="small"
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
              size="small"
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
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              disableElevation
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Log In
            </Button>
          </Box>
          <Grid justifyContent="center " marginTop="10px">
            <Link href="/sign-up" variant="body2" underline="none">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
          <Grid justifyContent="center " marginTop="0px">
            <Link
              href="/forgot-password"
              variant="body2"
              underline="none"
              sx={{ display: "block", mt: 2 }}
            >
              {"Forgot password?"}
            </Link>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
