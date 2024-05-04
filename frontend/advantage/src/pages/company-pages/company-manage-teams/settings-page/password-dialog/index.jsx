import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import { isFieldEmpty } from "../../../../../common/validator-functions/isFieldEmpty";

export default function PasswordDialog({ open, handleClose, openSnack }) {
  return (
    <Form
      onSubmit={(values) => {
        console.log(values);
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
                  validate={isFieldEmpty("New password must be entered.")}
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
                  validate={isFieldEmpty("Re-enter your new password.")}
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
