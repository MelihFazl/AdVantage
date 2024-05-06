import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import { BASE_URL } from "../../../../common/constans";
import { isFieldEmpty } from "../../../../common/validator-functions/isFieldEmpty";
import { composeValidators } from "../../../../common/validator-functions/composeValidators";
import { isValueNumerical } from "../../../../common/validator-functions/isValueNumerical";

export default function EditDialog({ open, handleClose, team, openSnack }) {
  return (
    <Form
      initialValues={{
        teamName: team.teamName,
        usageLimit: String(team.usageLimit),
      }}
      onSubmit={(values) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          teamName: values.teamName,
          usageLimit: values.usageLimit,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        var token = localStorage.getItem("userToken");
        fetch(
          BASE_URL +
            "/team/updateTeam?token=" +
            token +
            "&teamId=" +
            team.teamId,
          requestOptions
        )
          .then((response) => {
            if (response.ok) {
              window.location.reload();
              openSnack({
                severity: "success",
                text: "Team edited successfully",
              });
              return undefined;
            } else return response.text();
          })
          .then((result) => {
            if (result) {
              openSnack({ severity: "error", text: result });
            }
          })
          .catch((error) => console.error(error));
      }}
      render={({ handleSubmit }) => (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit} style={{ marginTop: 0, padding: 0 }}>
            <DialogContent>
              <Typography
                variant="h4"
                style={{ marginBottom: "5px", fontSize: "1.3rem" }}
              >
                Edit Team
              </Typography>
              <Stack direction={"column"} gap={"8px"}>
                <Field
                  name="teamName"
                  validate={isFieldEmpty("Team name must be entered.")}
                >
                  {({ input, meta }) => (
                    <Box
                      display={"flex"}
                      alignSelf={"stretch"}
                      flexDirection={"column"}
                      gap={"4px"}
                    >
                      <Typography>Team Name</Typography>
                      <TextField
                        {...input}
                        error={meta.touched && meta.error ? true : false}
                        variant="outlined"
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                        size="small"
                      />
                    </Box>
                  )}
                </Field>
                <Field
                  name="usageLimit"
                  validate={composeValidators([
                    isFieldEmpty("Limit must be set."),
                    isValueNumerical("Value must be numerical."),
                  ])}
                >
                  {({ input, meta }) => (
                    <Box
                      display={"flex"}
                      alignSelf={"stretch"}
                      flexDirection={"column"}
                      gap={"4px"}
                    >
                      <Typography>Usage Limit</Typography>
                      <TextField
                        {...input}
                        error={meta.touched && meta.error ? true : false}
                        variant="outlined"
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                        size="small"
                      />
                    </Box>
                  )}
                </Field>
              </Stack>
            </DialogContent>
            <DialogActions>
              {" "}
              <Button color="primary" type="submit">
                Save Changes
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    ></Form>
  );
}
