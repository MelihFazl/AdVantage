import LeftDrawer from "../../../common/left-drawer";
import React from "react";
import { TeamMemberDrawerItems } from "../team-member-drawer-items";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const TeamText = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "32px",
  marginLeft: "50px",
  marginRight: "50px",
});

const BannerText = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "20px",
});

const DevelopmentText = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "100px",
});

export const TeamMemberImageAnalysisPage = () => {
  return (
    <Stack direction={"row"}>
      <LeftDrawer drawerItems={TeamMemberDrawerItems}></LeftDrawer>
      <Stack
        direction="column"
        width="100%"
        position={"relative"}
        margin={0}
        padding={0}
        backgroundColor={"#FFFFFF"}
      >
        <Box
          minWidth={"530px"}
          display={"flex"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"auto"}
          alignItems="center"
          justifyContent="center"
          position={"sticky"}
          paddingTop={"8px"}
          top={0}
          backgroundColor={"#FFFFFF"}
        >
          <BannerText>Advantage Advertisement Suggestion Tool</BannerText>
        </Box>
        <Box
          minWidth={"530px"}
          display={"flex"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"auto"}
          justifyContent="center"
          alignItems="center"
          position={"sticky"}
          backgroundColor={"#FFFFFF"}
          paddingBottom={"8px"}
          top={38}
        >
          <TeamText>Analyze an image based advertisement</TeamText>
        </Box>
        <Box
          minWidth={"530px"}
          display={"flex"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"auto"}
          justifyContent="center"
          alignItems="center"
          position={"sticky"}
          backgroundColor={"#FFFFFF"}
          paddingTop={"200px"}
        >
          <DevelopmentText>IN DEVELOPMENT...</DevelopmentText>
        </Box>
      </Stack>
    </Stack>
  );
};
