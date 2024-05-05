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
  Stack,
} from "@mui/material";
import AdvSnackbar from "../../common/adv-snackbar";
import { Field, Form } from "react-final-form";
import { composeValidators } from "../../common/validator-functions/composeValidators";
import { isFieldEmpty } from "../../common/validator-functions/isFieldEmpty";
import { isValidPassword } from "../../common/validator-functions/isValidPassword";
import { BASE_URL } from "../../common/constans";
import { useNavigate } from "react-router-dom";

export const ReserPasswordPage = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [text, setText] = useState("");
  const SNACK_DURATION = 4000;
  const navigate = useNavigate();

  const openSnack = ({ severity, text }) => {
    setSeverity(severity);
    setText(text);
    setOpen(true);
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
            padding: "40px",
            height: "fit-content",
            width: "fit-content",
            borderRadius: "20px",
          }}
        >
          <Form
            initialValues={{
              newPassword: "",
              reNewPassword: "",
            }}
            onSubmit={(values) => {
              if (values.newPassword !== values.reNewPassword) {
                openSnack({
                  severity: "error",
                  text: "New passwords must be same.",
                });
              } else {
                const url = new URL(window.location);
                const token = url.searchParams.get("token");
                console.log(token);
                const requestOptions = {
                  method: "POST",
                  redirect: "follow",
                };

                fetch(
                  BASE_URL +
                    "/user/updatePassword?token=" +
                    token +
                    "&newPassword=" +
                    values.newPassword,
                  requestOptions
                )
                  .then((response) => response.text())
                  .then((result) => {
                    openSnack({
                      severity: "success",
                      text: "Password is set correctly.",
                    });
                    navigate("/login");
                  })
                  .catch((error) =>
                    openSnack({ severity: "error", text: error })
                  );
              }
            }}
            render={({ handleSubmit, form }) => (
              <form
                onSubmit={handleSubmit}
                style={{ marginTop: 0, padding: 0 }}
              >
                <Typography
                  variant="h4"
                  style={{ marginBottom: "5px", fontSize: "1.3rem" }}
                >
                  Change your password
                </Typography>
                <Stack direction={"column"} gap={"8px"}>
                  <Field
                    name="newPassword"
                    validate={composeValidators([
                      isFieldEmpty("New password must be entered."),
                      isValidPassword,
                    ])}
                  >
                    {({ input, meta }) => (
                      <Box
                        display={"flex"}
                        alignSelf={"stretch"}
                        flexDirection={"column"}
                        gap={"4px"}
                      >
                        <Typography>New Password</Typography>
                        <TextField
                          {...input}
                          error={meta.touched && meta.error ? true : false}
                          variant="outlined"
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                          type="password"
                          size="small"
                        />
                      </Box>
                    )}
                  </Field>
                  <Field
                    name="reNewPassword"
                    validate={composeValidators([
                      isFieldEmpty("Re-enter your new password."),
                      isValidPassword,
                    ])}
                  >
                    {({ input, meta }) => (
                      <Box
                        display={"flex"}
                        alignSelf={"stretch"}
                        flexDirection={"column"}
                        gap={"4px"}
                      >
                        <Typography>Re-enter New Password</Typography>
                        <TextField
                          {...input}
                          error={meta.touched && meta.error ? true : false}
                          variant="outlined"
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                          type="password"
                          size="small"
                        />
                      </Box>
                    )}
                  </Field>
                  <Button
                    color="primary"
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Save
                  </Button>
                </Stack>
              </form>
            )}
          ></Form>
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

export default ReserPasswordPage;
