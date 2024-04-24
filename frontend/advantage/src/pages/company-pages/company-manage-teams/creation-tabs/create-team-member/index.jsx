import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import * as React from "react";
import { isFieldEmpty } from "../../../../../common/validator-functions/isFieldEmpty";
import { composeValidators } from "../../../../../common/validator-functions/composeValidators";
import { isValidEmail } from "../../../../../common/validator-functions/isValidEmail";

export default function CreateTeamMemberForm({ teams }) {
  const theme = useTheme();
  const [teamName, setTeamName] = useState([]);

  function getStyles(team, teamName, theme) {
    return {
      fontWeight:
        teamName.indexOf(team) === -1
          ? theme.typography?.fontWeightRegular ?? "normal"
          : theme.typography?.fontWeightMedium ?? "bold",
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTeamName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Form
      keepDirtyOnReinitialize
      onSubmit={(values) => {}}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} gap={"8px"}>
            <Box
              display={"flex"}
              alignSelf={"stretch"}
              flexDirection={"row"}
              gap={"4px"}
              width={"%100"}
            >
              <Field name="name" validate={isFieldEmpty("Required")}>
                {({ input, meta }) => (
                  <Box
                    display={"flex"}
                    alignSelf={"stretch"}
                    flexDirection={"column"}
                    gap={"4px"}
                    flex={1}
                  >
                    <Typography>Name</Typography>
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
              <Field name="surname" validate={isFieldEmpty("Required")}>
                {({ input, meta }) => (
                  <Box
                    display={"flex"}
                    alignSelf={"stretch"}
                    flexDirection={"column"}
                    gap={"4px"}
                    flex={1}
                  >
                    <Typography>Surname</Typography>
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
            </Box>
            <Field
              name="email"
              validate={composeValidators([
                isFieldEmpty("Email must be entered."),
                isValidEmail("Email must be in valid format."),
              ])}
            >
              {({ input, meta }) => (
                <Box
                  display={"flex"}
                  alignSelf={"stretch"}
                  flexDirection={"column"}
                  gap={"4px"}
                >
                  <Typography>Email</Typography>
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
            <Field name="team">
              {({ input, meta }) => (
                <Box
                  display={"flex"}
                  alignSelf={"stretch"}
                  flexDirection={"column"}
                  gap={"4px"}
                >
                  <Typography>Select Team (Optional)</Typography>
                  <Select
                    {...input}
                    id="team"
                    multiple
                    value={teamName}
                    onChange={handleChange}
                    size="small"
                  >
                    {teams.map((team) => (
                      <MenuItem
                        key={team.teamName}
                        value={team.teamId}
                        style={getStyles(team, teamName, theme)}
                      >
                        {team.teamName}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            </Field>
            <Box alignSelf={"flex-end"} marginTop={"8px"}>
              <Button variant="contained" disableElevation type="submit">
                Create Team Member
              </Button>
            </Box>
          </Stack>
        </form>
      )}
    ></Form>
  );
}
