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

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      BASE_URL + "/user/teamMember?userID=" + localStorage.getItem("userId"),
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          BASE_URL +
            "/analysisReport/getAllByTeamId?teamId=" +
            JSON.parse(result)[0].team.teamId,
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
          <TeamText>See team's previous reports</TeamText>
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
                {reports.map((element) => {
                  return (
                    <ReportListCard
                      onReportCardClick={handleCardClick}
                      report={element}
                    ></ReportListCard>
                  );
                })}

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
