import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateTeamForm from "./create-team";
import CreateTeamMemberForm from "./create-team-member";
import { Paper } from "@mui/material";

export default function CreationTabs({ teams, openSnack }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: "12px", padding: "10px 30px 0px 30px" }}
    >
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} centered variant="fullWidth">
              <Tab
                label="Create New Team"
                value="1"
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                label="Create New Team Member"
                value="2"
                sx={{ fontWeight: "bold" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CreateTeamForm openSnack={openSnack}></CreateTeamForm>
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <CreateTeamMemberForm
              teams={teams}
              openSnack={openSnack}
            ></CreateTeamMemberForm>
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
}
