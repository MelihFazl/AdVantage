import LeftDrawer from "../../../common/left-drawer";
import React, { useEffect } from "react";
import { TeamMemberDrawerItems } from "../team-member-drawer-items";
import { Paper, Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReportListCard from "./report-list-card";
import ReportDialog from "../report-dialog";
import { useState } from "react";
import { BASE_URL } from "../../../common/constans";
import LinearProgress from "@mui/material/LinearProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BannerText = styled(Typography)({
  textAlign: "center",
  color: "#000080",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "20px",
});

const NoText = styled(Typography)({
  textAlign: "center",
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#000",
}));

export const TeamMemberHomePage = () => {
  const [selectedReport, setSelectedReport] = useState({
    title: "",
    content: " ",
    category: "",
    uploader: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [reports, setReports] = useState([]);
  const [isReportsRecevied, setIsReportsReceived] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    var token = localStorage.getItem("userToken");
    var user = jwtDecode(token);
    const unixTimestamp = user.exp * 1000;
    const date = new Date(unixTimestamp);
    const currentDate = new Date();
    if (date < currentDate) {
      navigate("/session-expired");
    }
    if (user.userType !== "TM") {
      navigate("/forbidden");
    }
    fetch(BASE_URL + "/team/getAllMemberTeams?token=" + token, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTeams(result);
        setSelectedTeam(result[0]);
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(
          BASE_URL +
            "/analysisReport/getAllByTeamId?token=" +
            token +
            "&teamId=" +
            result[0].teamId,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            setReports(JSON.parse(result).reverse());
            setIsReportsReceived(true);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleCardClick = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    var token = localStorage.getItem("userToken");
    setIsReportsReceived(false);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      BASE_URL +
        "/analysisReport/getAllByTeamId?token=" +
        token +
        "&teamId=" +
        event.target.value.teamId,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setReports(JSON.parse(result).reverse());
        setIsReportsReceived(true);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Stack direction={"row"}>
      <LeftDrawer
        drawerItems={TeamMemberDrawerItems}
        adaptWidth={1071}
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
          flexDirection={"column"}
          gap={"8px"}
          top={38}
        >
          {!isReportsRecevied ? (
            <TeamText>See team's previous reports</TeamText>
          ) : (
            <React.Fragment>
              <TeamText>
                See {selectedTeam.teamName}'s previous reports
              </TeamText>
              <Box
                minWidth={"400px"}
                display={"flex"}
                paddingRight={"15px"}
                paddingLeft={"15px"}
              >
                <FormControl fullWidth>
                  <InputLabel id="selectTeam">Select team</InputLabel>
                  <Select
                    labelId="selectTeam"
                    id="selectTeam"
                    key="selectTeam"
                    value={selectedTeam}
                    label="selectTeam"
                    onChange={handleTeamChange}
                  >
                    {teams.map((team) => (
                      <MenuItem value={team}>{team.teamName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </React.Fragment>
          )}
        </Box>
        {isReportsRecevied ? (
          <Box sx={{ width: 1 }}>
            <Box
              backgroundColor="#FFFFFF"
              display="grid"
              gridTemplateColumns="repeat(auto-fit,  minmax(263.2px, 1fr))"
              gap={"20px"}
              padding={"20px 80px 80px 80px"}
              flexWrap={"wrap"}
            >
              <React.Fragment>
                {reports.length === 0 ? (
                  <NoText>This team doesn't have any reports yet.</NoText>
                ) : (
                  reports.map((element) => {
                    return (
                      <React.Fragment key={`${element.report.reportId}`}>
                        <ReportListCard
                          onReportCardClick={handleCardClick}
                          report={element}
                        ></ReportListCard>
                      </React.Fragment>
                    );
                  })
                )}

                <ReportDialog
                  open={openDialog}
                  handleClose={handleCloseDialog}
                  report={selectedReport}
                ></ReportDialog>
              </React.Fragment>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
