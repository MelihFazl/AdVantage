import React from "react";
import { TopBarHome } from "../../common/top-bar-home";
import styled from "@emotion/styled";
import { Form, Field } from "react-final-form";
import { isFieldEmpty } from "../../common/validator-functions/isFieldEmpty";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import registerImage from "../../assets/images/register.png";
import { BASE_URL } from "../../common/constans";
import { useNavigate } from "react-router-dom";
import { composeValidators } from "../../common/validator-functions/composeValidators";
import { isValidPassword } from "../../common/validator-functions/isValidPassword";
import { isValidEmail } from "../../common/validator-functions/isValidEmail";
import { isTrue } from "../../common/validator-functions/isTrue";
import AdvSnackbar from "../../common/adv-snackbar";
import { useState } from "react";

const ImageBox = styled(Box)`
  width: 50%;
  height: 100%;
  background-image: url(${registerImage});
  background-size: cover;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const FormContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 50%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const SNACK_DURATION = 4000;

  const openSnack = ({ severity, text }) => {
    setSeverity(severity);
    setText(text);
    setOpen(true);
  };
  return (
    <React.Fragment>
      {" "}
      <Container
        maxWidth="false"
        disableGutters
        sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <TopBarHome />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <FormContainer elevation={3}>
            <Paper
              variant="outlined"
              sx={{
                display: "block",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 60px 20px 60px",
                margin: "20px 30px 20px 30px",
                borderRadius: "12px",
                flexGrow: "4",
                minWidth: "300px",
                maxWidth: "480px",
                height: "fit-content",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Sign Up
              </Typography>
              <Box sx={{ mt: 0.0, width: "100%" }}>
                <Form
                  keepDirtyOnReinitialize
                  validate={(values) =>
                    !(
                      isFieldEmpty(values.companyName) &&
                      isFieldEmpty(values.title) &&
                      isFieldEmpty(values.firstName) &&
                      isFieldEmpty(values.lastName) &&
                      isFieldEmpty(values.email) &&
                      isFieldEmpty(values.password) &&
                      isFieldEmpty(values.reEnterPassword) &&
                      isTrue(values.consent)
                    )
                  }
                  initialValues={{
                    companyName: "",
                    title: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    reEnterPassword: "",
                  }}
                  onSubmit={(values) => {
                    if (values.password === values.reEnterPassword) {
                      setLoading(true);
                      const myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");

                      const raw = JSON.stringify({
                        name: values.firstName,
                        surname: values.lastName,
                        email: values.email,
                        hashedPassword: values.password,
                      });

                      const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                      };

                      fetch(
                        BASE_URL +
                          "/user/companyAdministrator/add?companyName=" +
                          values.companyName,
                        requestOptions
                      )
                        .then((response) => {
                          if (response.ok) {
                            openSnack({
                              severity: "success",
                              text: "Your account created successfully.",
                            });
                            setTimeout(() => {
                              navigate("/login");
                            }, 1000);
                            setLoading(false);
                          } else {
                            response.text().then((result) => {
                              openSnack({ severity: "error", text: result });
                              setLoading(false);
                            });
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          setLoading(false);
                        });
                    } else {
                      openSnack({
                        severity: "error",
                        text: "Passwords must be same.",
                      });
                    }
                  }}
                  render={({ handleSubmit, invalid }) => (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ mt: 1, width: "100%" }}>
                        <Field
                          name="companyName"
                          validate={isFieldEmpty(
                            "Company name must be entered."
                          )}
                        >
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              label="Company Name"
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
                          name="title"
                          validate={isFieldEmpty("Title must be entered.")}
                        >
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              margin="normal"
                              required
                              fullWidth
                              label="Your Title"
                              error={meta.touched && meta.error ? true : false}
                              variant="outlined"
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          )}
                        </Field>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Field
                            name="firstName"
                            validate={isFieldEmpty(
                              "First name must be entered."
                            )}
                          >
                            {({ input, meta }) => (
                              <TextField
                                {...input}
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="First Name"
                                error={
                                  meta.touched && meta.error ? true : false
                                }
                                variant="outlined"
                                helperText={
                                  meta.touched && meta.error ? meta.error : ""
                                }
                                sx={{ width: "calc(50% - 7.5px)" }}
                              />
                            )}
                          </Field>
                          <Field
                            name="lastName"
                            validate={isFieldEmpty(
                              "Last name must be entered."
                            )}
                          >
                            {({ input, meta }) => (
                              <TextField
                                {...input}
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="Last Name"
                                error={
                                  meta.touched && meta.error ? true : false
                                }
                                variant="outlined"
                                helperText={
                                  meta.touched && meta.error ? meta.error : ""
                                }
                                sx={{ width: "calc(50% - 7.5px)" }}
                              />
                            )}
                          </Field>
                        </Box>
                        <Field
                          name="email"
                          validate={composeValidators([
                            isFieldEmpty("Email must be entered."),
                            isValidEmail("Enter a valid email address."),
                          ])}
                        >
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              margin="normal"
                              required
                              fullWidth
                              label="Email Address"
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
                          validate={composeValidators([
                            isFieldEmpty("Password must be entered."),
                            isValidPassword,
                          ])}
                        >
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              margin="normal"
                              required
                              fullWidth
                              label="Password"
                              type="password"
                              error={meta.touched && meta.error ? true : false}
                              variant="outlined"
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          )}
                        </Field>
                        <Field
                          name="reEnterPassword"
                          validate={composeValidators([
                            isFieldEmpty("Re-enter your password."),
                            isValidPassword,
                          ])}
                        >
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              margin="normal"
                              required
                              fullWidth
                              label="Re-enter Password"
                              type="password"
                              id="reEnterPassword"
                              error={meta.touched && meta.error ? true : false}
                              variant="outlined"
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          )}
                        </Field>
                        <Field
                          name="consent"
                          validate={isTrue("Accept terms to continue.")}
                        >
                          {({ input }) => (
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox {...input} />}
                                label="I give my consent to AdVantage to use my data."
                              />
                            </FormGroup>
                          )}
                        </Field>
                        <Button
                          type="submit"
                          disabled={invalid || loading}
                          disableElevation
                          fullWidth
                          variant="contained"
                          sx={{ mt: 1 }}
                        >
                          {loading ? (
                            <CircularProgress
                              style={{ height: "24.5px", width: "24.5px" }}
                              color="inherit"
                            ></CircularProgress>
                          ) : (
                            "Sign Up"
                          )}
                        </Button>
                      </Box>
                    </form>
                  )}
                ></Form>
              </Box>
            </Paper>
          </FormContainer>
          <ImageBox />
        </Box>
      </Container>
      <AdvSnackbar
        open={open}
        setOpen={setOpen}
        severity={severity}
        duration={SNACK_DURATION}
        text={text}
      ></AdvSnackbar>
    </React.Fragment>
  );
};

export default SignUpPage;
