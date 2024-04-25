import LeftDrawer from "../../../common/left-drawer";
import { CompanyDrawerItems } from "../company-drawer-items";
import { Paper, Box, Stack, Typography, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import CreationTabs from "./creation-tabs";
import TeamListCard from "./team-list-card";
import { useState, useEffect } from "react";
import TeamDialog from "./team-dialog";
import React from "react";
import EditDialog from "./edit-dialog";
import AddMemberDialog from "./add-member-dialog";
import { BASE_URL } from "../../../common/constans";
import DeleteDialog from "./delete-dialog";
import AdvSnackbar from "../../../common/adv-snackbar";

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
  const matches = useMediaQuery("(min-width:1060px)");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [text, setText] = useState("");
  const [company, setCompany] = useState({});

  const SNACK_DURATION = 4000;

  useEffect(() => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    var token = localStorage.getItem("userToken");
    fetch(BASE_URL + "/team/getAllTeams?token=" + token, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTeams(result);
      })
      .catch((error) => console.log("error", error));

    const requestOptions2 = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/company/get?token=" + token, requestOptions2)
      .then((response) => response.json())
      .then((result) => {
        setCompany(result);
      })
      .catch((error) => console.error(error));
  }, []);

  const openSnack = ({ severity, text }) => {
    setSeverity(severity);
    setText(text);
    setOpen(true);
  };

  const handleCardClick = (team) => {
    setSelectedTeam(team);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleEditClick = (team) => {
    setSelectedTeam(team);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleAddClick = (team) => {
    setSelectedTeam(team);
    setOpenAddDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  const handleDeleteClick = (team) => {
    setSelectedTeam(team);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <Stack direction={"row"}>
      <LeftDrawer
        drawerItems={CompanyDrawerItems}
        adaptWidth={1232}
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
          padding={"0px 20px 10px 20px"}
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
              <CreationTabs teams={teams} openSnack={openSnack}></CreationTabs>
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
                    paddingBottom: "16px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <BoxTitle>Company Details</BoxTitle>
                  <Typography>
                    {"Allocated Limit: " +
                      (company.subscription.usageLimit -
                        company.availableLimit)}
                  </Typography>
                  <Typography>
                    {"Available Limit: " + company.availableLimit}
                  </Typography>
                  <Typography>{"Number of Teams: " + teams.length}</Typography>
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
                {teams.map((team) => (
                  <TeamListCard
                    onTeamCardClick={handleCardClick}
                    onEditClick={handleEditClick}
                    onAddClick={handleAddClick}
                    onDeleteClick={handleDeleteClick}
                    team={team}
                  ></TeamListCard>
                ))}
                <TeamDialog
                  open={openDialog}
                  handleClose={handleCloseDialog}
                  team={selectedTeam}
                ></TeamDialog>
                <EditDialog
                  open={openEditDialog}
                  handleClose={handleCloseEditDialog}
                  team={selectedTeam}
                  openSnack={openSnack}
                ></EditDialog>
                <AddMemberDialog
                  open={openAddDialog}
                  handleClose={handleCloseAddDialog}
                  team={selectedTeam}
                  openSnack={openSnack}
                ></AddMemberDialog>
                <DeleteDialog
                  open={openDeleteDialog}
                  handleClose={handleCloseDeleteDialog}
                  team={selectedTeam}
                  openSnack={openSnack}
                ></DeleteDialog>
              </React.Fragment>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
      <AdvSnackbar
        open={open}
        setOpen={setOpen}
        severity={severity}
        duration={SNACK_DURATION}
        text={text}
      ></AdvSnackbar>
    </Stack>
  );
};
