import { TopBarHome } from "../../common/top-bar-home";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { jwtDecode } from "jwt-decode";
import { Form, Field } from "react-final-form";
import { isFieldEmpty } from "../../common/validator-functions/isFieldEmpty";
import {
  Grid,
  Container,
  Box,
  TextField,
  Checkbox,
  Button,
  Typography,
  Link,
  Paper,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import yourImage from "../../assets/images/login.png";
import { BASE_URL } from "../../common/constans";

const ImageBox = styled(Box)`
  width: 50%;
  height: 100%;
  background-image: url(${yourImage});
  background-size: cover;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const FormContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <TopBarHome />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <ImageBox></ImageBox>

        <FormContainer>
          <Paper
            variant="outlined"
            sx={{
              display: "block",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 60px 20px 60px",
              margin: "30px 30px 20px 30px",
              borderRadius: "12px",
              flexGrow: "4",
              minWidth: "300px",
              maxWidth: "480px",
              maxHeight: "400px",
              height: "fit-content",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Log In
            </Typography>
            <Box sx={{ mt: 1, width: "%100" }}>
              <Form
                keepDirtyOnReinitialize
                validate={(values) =>
                  !(isFieldEmpty(values.email) && isFieldEmpty(values.password))
                }
                initialValues={{ password: "", email: "", rememberMe: false }}
                onSubmit={(values) => {
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                    email: values.email,
                    password: values.password,
                  });

                  var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                  };

                  fetch(BASE_URL + "/user/login", requestOptions)
                    .then((response) => {
                      if (response.ok) {
                        response.text().then((result) => {
                          var token = result;
                          var user = jwtDecode(token);
                          localStorage.setItem("userToken", token);
                          if (token && user.userType === "TM") {
                            navigate("/team-member");
                          } else {
                            navigate("/company/manageTeams");
                          }
                        });
                      } else {
                        response.text().then((result) => {
                          alert(result);
                        });
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                render={({ handleSubmit, invalid }) => (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ mt: 1, width: "100%" }}>
                      <Field
                        name="email"
                        validate={isFieldEmpty("Email must be entered.")}
                      >
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            label="Email Address"
                            size="small"
                            margin="normal"
                            fullWidth
                            required
                            error={meta.touched && meta.error ? true : false}
                            variant="outlined"
                            helperText={
                              meta.touched && meta.error ? meta.error : ""
                            }
                          />
                        )}
                      </Field>
                      <Field
                        name="password"
                        validate={isFieldEmpty("Password must be entered.")}
                      >
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            error={meta.touched && meta.error ? true : false}
                            variant="outlined"
                            helperText={
                              meta.touched && meta.error ? meta.error : ""
                            }
                          />
                        )}
                      </Field>
                      <Field name="rememberMe" type="checkbox">
                        {({ input }) => (
                          <FormControlLabel
                            label="Remember Me"
                            control={<Checkbox {...input}></Checkbox>}
                          ></FormControlLabel>
                        )}
                      </Field>
                      <Button
                        type="submit"
                        disableElevation
                        disabled={invalid}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1 }}
                      >
                        Log In
                      </Button>
                    </Box>
                  </form>
                )}
              ></Form>
            </Box>
            <Grid justifyContent="center " marginTop="18px">
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
        </FormContainer>
      </Box>
    </Container>
  );
};

export default LoginPage;
