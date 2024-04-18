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

export default function CreateTeamMemberForm({ teams }) {
  const theme = useTheme();
  const [teamName, setTeamName] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
              <Field name="name">
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
              <Field name="surname">
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
            <Field name="email">
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
                  <Typography>Select Team</Typography>
                  <Select
                    id="team"
                    multiple
                    value={teamName}
                    onChange={handleChange}
                    size="small"
                  >
                    {teams.map((team) => (
                      <MenuItem
                        key={team}
                        value={team}
                        style={getStyles(team, teamName, theme)}
                      >
                        {team}
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
