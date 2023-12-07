import LeftDrawer from "../../../common/left-drawer";
import React from "react";
import { TeamMemberDrawerItems } from "../team-member-drawer-items";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BannerText = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "20px",
});

const TeamText = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "32px",
});

export const TeamMemberHomePage = () => {
  return (
    <Stack direction={"row"}>
      <LeftDrawer drawerItems={TeamMemberDrawerItems}></LeftDrawer>
      <Stack direction="column" width="100%">
        <Box
          display={"flex"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"auto"}
          alignItems="center"
          justifyContent="center"
          marginTop={"20px"}
          padding={0}
        >
          <BannerText>Advantage Advertisement Suggestion Tool</BannerText>
        </Box>
        <Box
          display={"flex"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"auto"}
          justifyContent="center"
          alignItems="center"
        >
          <TeamText>See team Veni Vidi Code's previous reports</TeamText>
        </Box>
      </Stack>
    </Stack>
  );
};
