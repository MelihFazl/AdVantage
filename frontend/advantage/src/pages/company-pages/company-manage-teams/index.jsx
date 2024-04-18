import LeftDrawer from "../../../common/left-drawer";
import { CompanyDrawerItems } from "../company-drawer-items";
import { Paper, Box, Stack, Typography, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import CreationTabs from "./creation-tabs";
import TeamListCard from "./team-list-card";
import { useState } from "react";
import TeamDialog from "./team-dialog";
import React from "react";

const BannerText = styled(Typography)({
  textAlign: "center",
  color: "#000080",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "20px",
});

const TeamText = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "32px",
  marginLeft: "50px",
  marginRight: "50px",
});

const BoxTitle = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "16px",
  marginLeft: "50px",
  marginRight: "50px",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#000",
}));

export const CompanyManageTeams = () => {
  const matches = useMediaQuery("(min-width:1035px)");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});
  const teams = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const handleCardClick = (team) => {
    setSelectedTeam(team);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Stack direction={"row"}>
      <LeftDrawer
        drawerItems={CompanyDrawerItems}
        adaptWidth={1156}
      ></LeftDrawer>
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
          zIndex={10}
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
          zIndex={10}
          position={"sticky"}
          backgroundColor={"#FFFFFF"}
          paddingBottom={"8px"}
          top={38}
        >
          <TeamText>Manage teams in your company</TeamText>
        </Box>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          padding={"0px 20px 20px 20px"}
          gap={"16px"}
          position={"relative"}
        >
          <Paper
            elevation={0}
            sx={{
              display: "block",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: "2",
              minWidth: "300px",
              maxWidth: matches ? "400px" : "%100",
              height: "fit-content",
              position: matches ? "sticky" : "relative",
              top: matches ? 94 : 0,
            }}
          >
            <Stack direction={"column"} gap={"16px"}>
              <CreationTabs teams={teams}></CreationTabs>
              <Paper
                variant="outlined"
                sx={{ borderRadius: "12px", padding: "10px 30px 0px 30px" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    paddingBottom: "20px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <BoxTitle>Company Details</BoxTitle>
                  <Typography>Allocated Limit: 123123</Typography>
                  <Typography>Available Limit: 886877</Typography>
                  <Typography>Number of Teams: 6</Typography>
                </Box>
              </Paper>
            </Stack>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              display: "block",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: "6",
              minWidth: "460px",
              height: "fit-content",
            }}
          >
            <Stack direction={"column"} gap={"8px"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "8px 30px 8px 30px",
                  position: matches ? "sticky" : "relative",
                  top: matches ? 94 : 0,
                  zIndex: 9,
                  width: "%100",
                  backgroundColor: "#ffffff",
                }}
              >
                <BoxTitle>Teams</BoxTitle>
              </Paper>
              <React.Fragment>
                {" "}
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamListCard onTeamCardClick={handleCardClick}></TeamListCard>
                <TeamDialog
                  open={openDialog}
                  handleClose={handleCloseDialog}
                  report={selectedTeam}
                ></TeamDialog>
              </React.Fragment>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
};
