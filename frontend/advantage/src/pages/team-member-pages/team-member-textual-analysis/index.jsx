import LeftDrawer from "../../../common/left-drawer";
import React from "react";
import { TeamMemberDrawerItems } from "../team-member-drawer-items";
import { Stack } from "@mui/material";

export const TeamMemberTextualAnalysisPage = () => {
  return (
    <Stack direction={"row"}>
      <LeftDrawer drawerItems={TeamMemberDrawerItems}></LeftDrawer>
      TEXTUAL ANALYSIS
    </Stack>
  );
};
