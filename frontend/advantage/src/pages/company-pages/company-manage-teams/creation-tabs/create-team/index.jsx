import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import * as React from "react";
import { isFieldEmpty } from "../../../../../common/validator-functions/isFieldEmpty";
import { isValueNumerical } from "../../../../../common/validator-functions/isValueNumerical";
import { composeValidators } from "../../../../../common/validator-functions/composeValidators";
import { BASE_URL } from "../../../../../common/constans";

export default function CreateTeamForm() {
  return (
    <Form
      keepDirtyOnReinitialize
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
        fetch(BASE_URL + "/team/addTeam?token=" + token, requestOptions)
          .then((response) => response.text())
          .then((result) => window.location.reload())
          .catch((error) => console.error(error));
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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
                    helperText={meta.touched && meta.error ? meta.error : ""}
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
                    helperText={meta.touched && meta.error ? meta.error : ""}
                    size="small"
                  />
                </Box>
              )}
            </Field>
            <Box alignSelf={"flex-end"} marginTop={"8px"}>
              <Button variant="contained" disableElevation type="submit">
                Create Team
              </Button>
            </Box>
          </Stack>
        </form>
      )}
    ></Form>
  );
}
