import LeftDrawer from "../../../common/left-drawer";
import React from "react";
import { TeamMemberDrawerItems } from "../team-member-drawer-items";
import { Paper, Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReportListCard from "./report-list-card";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#000",
}));

export const TeamMemberHomePage = () => {
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
          paddingTop={"20px"}
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
          paddingBottom={"32px"}
          top={50}
        >
          <TeamText>See team Veni Vidi Code's previous reports</TeamText>
        </Box>
        <Box sx={{ width: 1 }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit,  minmax(263.2px, 1fr))"
            gap={"20px"}
            padding={"5px 80px 80px 80px"}
            flexWrap={"wrap"}
          >
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
            <ReportListCard></ReportListCard>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
