import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import * as React from "react";

export default function CreateTeamForm() {
  return (
    <Form
      keepDirtyOnReinitialize
      onSubmit={(values) => {}}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} gap={"8px"}>
            <Field name="teamName">
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
            <Field name="usageLimit">
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
