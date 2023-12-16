import { TopBarHome } from "../../common/top-bar-home";
import React, { useState, useEffect } from "react";
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
import { BASE_URL } from "../../common/constans";

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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "/user/teamMember/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result.substring(0, 2) === "TM") {
          localStorage.setItem("userType", "tm");
          localStorage.setItem("userToken", result);
          navigate("/team-member");
        } else {
          alert(result);
        }
      })
      .catch((error) => console.log("error", error));
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
