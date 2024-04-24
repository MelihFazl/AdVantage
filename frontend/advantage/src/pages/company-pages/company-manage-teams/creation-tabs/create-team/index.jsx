import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import * as React from "react";
import { isFieldEmpty } from "../../../../../common/validator-functions/isFieldEmpty";
import { isValueNumerical } from "../../../../../common/validator-functions/isValueNumerical";
import { composeValidators } from "../../../../../common/validator-functions/composeValidators";

export default function CreateTeamForm({ initialValues, isEdit }) {
  return (
    <Form
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {}}
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
            {!isEdit && (
              <Box alignSelf={"flex-end"} marginTop={"8px"}>
                <Button variant="contained" disableElevation type="submit">
                  Create Team
                </Button>
              </Box>
            )}
          </Stack>
        </form>
      )}
    ></Form>
  );
}
