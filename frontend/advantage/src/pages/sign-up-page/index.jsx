import { Link } from "react-router-dom";
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
} from "@mui/material";
import registerImage from "../../assets/images/register.png";
import { BASE_URL } from "../../common/constans";
import { useNavigate } from "react-router-dom";

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
  return (
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
                    isFieldEmpty(values.reEnterPassword)
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
                          response.text().then((result) => {
                            alert(result);
                          });
                          navigate("/login");
                        } else {
                          response.text().then((result) => {
                            alert(result);
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    alert("Passwords must be same.");
                  }
                }}
                render={({ handleSubmit, invalid }) => (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ mt: 1, width: "100%" }}>
                      <Field
                        name="companyName"
                        validate={isFieldEmpty("Company name must be entered.")}
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
                          validate={isFieldEmpty("First name must be entered.")}
                        >
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              margin="normal"
                              required
                              fullWidth
                              label="First Name"
                              error={meta.touched && meta.error ? true : false}
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
                          validate={isFieldEmpty("Last name must be entered.")}
                        >
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              margin="normal"
                              required
                              fullWidth
                              label="Last Name"
                              error={meta.touched && meta.error ? true : false}
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
                        validate={isFieldEmpty(
                          "Email address must be entered."
                        )}
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
                        validate={isFieldEmpty(
                          "Password name must be entered."
                        )}
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
                        validate={isFieldEmpty("Re-enter your Password.")}
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
                      <Button
                        type="submit"
                        disabled={invalid}
                        disableElevation
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1 }}
                      >
                        Sign Up
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
  );
};

export default SignUpPage;
