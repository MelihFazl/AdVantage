import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import { isFieldEmpty } from "../../../../common/validator-functions/isFieldEmpty";
import { composeValidators } from "../../../../common/validator-functions/composeValidators";
import { isValidPassword } from "../../../../common/validator-functions/isValidPassword";
import { BASE_URL } from "../../../../common/constans";

export default function PasswordDialog({ open, user, handleClose, openSnack }) {
  return (
    <Form
      initialValues={{
        oldPassword: "",
        newPassword: "",
        reNewPassword: "",
      }}
      onSubmit={(values) => {
        if (values.newPassword !== values.reNewPassword) {
          openSnack({ severity: "error", text: "New passwords must be same." });
        } else {
          const requestOptions = {
            method: "POST",
            redirect: "follow",
          };
          var token = localStorage.getItem("userToken");
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            email: user?.email,
            password: values.oldPassword,
          });

          const requestOptions2 = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(BASE_URL + "/user/login", requestOptions2)
            .then((response) => {
              if (response.ok) {
                fetch(
                  BASE_URL +
                    "/user/updatePassword?token=" +
                    token +
                    "&newPassword=" +
                    values.newPassword,
                  requestOptions
                )
                  .then((response) => response.text())
                  .then((result) =>
                    openSnack({
                      severity: "success",
                      text: "Password is set correctly.",
                    })
                  )
                  .catch((error) =>
                    openSnack({ severity: "error", text: error })
                  );
              } else {
                openSnack({
                  severity: "error",
                  text: "Old password is not correct.",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }}
      render={({ handleSubmit, form }) => (
        <Dialog
          open={open}
          onClose={() => {
            handleClose();
            setTimeout(() => {
              form.reset();
            }, 200);
          }}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit} style={{ marginTop: 0, padding: 0 }}>
            <DialogContent>
              <Typography
                variant="h4"
                style={{ marginBottom: "5px", fontSize: "1.3rem" }}
              >
                Change your password
              </Typography>
              <Stack direction={"column"} gap={"8px"}>
                <Field
                  name="oldPassword"
                  validate={isFieldEmpty("Old password must be entered.")}
                >
                  {({ input, meta }) => (
                    <Box
                      display={"flex"}
                      alignSelf={"stretch"}
                      flexDirection={"column"}
                      gap={"4px"}
                    >
                      <Typography>Old Password</Typography>
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
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    form.reset();
                  }, 200);
                }}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    ></Form>
  );
}
