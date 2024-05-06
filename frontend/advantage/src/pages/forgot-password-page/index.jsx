import { Link } from "react-router-dom";
import { TopBarHome } from "../../common/top-bar-home";
import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/constans";
import AdvSnackbar from "../../common/adv-snackbar";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [text, setText] = useState("");
  const SNACK_DURATION = 4000;

  const openSnack = ({ severity, text }) => {
    setSeverity(severity);
    setText(text);
    setOpen(true);
  };

  const handleSendResetLink = () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(BASE_URL + "/user/forgetPassword?email=" + email, requestOptions)
      .then((response) => {
        if (response.ok)
          openSnack({ severity: "success", text: "Email sent successfully." });
        else openSnack({ severity: "error", text: "Something went wrong." });
      })

      .catch((error) => console.error(error));
  };

  return (
    <>
      <TopBarHome />
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "60vh",
          width: "70%",
          padding: "100px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            height: "100%",
            width: "50%",
            borderRadius: "20px",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Forgotten your password?
          </Typography>
          <Typography variant="body2" sx={{ mt: 4, textAlign: "center" }}>
            There is nothing to worry about; we'll send you a message to help
            you reset your password.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 2, width: "50%" }}>
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
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, textTransform: "none" }} // Use 'none' for textTransform to prevent all capital letters
              onClick={handleSendResetLink}
            >
              Send Reset Link
            </Button>
          </Box>
          <MuiLink component={Link} to="/login" variant="body2" sx={{ mt: 2 }}>
            Remember your password? Log In
          </MuiLink>
        </Paper>
      </Container>
      <AdvSnackbar
        open={open}
        setOpen={setOpen}
        severity={severity}
        duration={SNACK_DURATION}
        text={text}
      ></AdvSnackbar>
    </>
  );
};

export default ForgotPasswordPage;
