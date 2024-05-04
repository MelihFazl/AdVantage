import LeftDrawer from "../../../../common/left-drawer";
import React, { useEffect, useState } from "react";
import { CompanyDrawerItems } from "../../company-drawer-items";
import { Paper, Box, Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../../../common/constans";
import PasswordDialog from "./password-dialog";

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

const BoxTitle = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "16px",
  marginLeft: "50px",
  marginRight: "50px",
});

export const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState(undefined);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    var token = localStorage.getItem("userToken");
    var user = jwtDecode(token);
    const unixTimestamp = user.exp * 1000;
    const date = new Date(unixTimestamp);
    const currentDate = new Date();
    if (date < currentDate) {
      navigate("/session-expired");
    }
    if (user.userType !== "CA") {
      navigate("/forbidden");
    }
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      BASE_URL +
        "/user/companyAdministrator?companyAdministratorId=" +
        user.userId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setMember(result[0]);
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Stack direction={"row"}>
        <LeftDrawer
          drawerItems={CompanyDrawerItems}
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
            paddingTop={"8px"}
            top={0}
            backgroundColor={"#FFFFFF"}
            zIndex={2}
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
            paddingBottom={"20px"}
            top={38}
            zIndex={2}
          >
            <TeamText>Settings</TeamText>
          </Box>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: "12px",
              minWidth: "500px",
              maxWidth: "600px",
              padding: "10px 30px 10px 30px",
              margin: "0px 50px 8px 50px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <BoxTitle>User Details</BoxTitle>
                <Typography>
                  {"Name: " +
                    (member ? member.name + " " + member.surname : "")}
                </Typography>
                <Typography>
                  {"Company: " + (member ? member.company.companyName : "")}
                </Typography>
                <Typography>
                  {"Email: " + (member ? member.email : "")}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: "12px",
              minWidth: "500px",
              maxWidth: "600px",
              padding: "10px 30px 10px 30px",
              margin: "0px 50px 8px 50px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                disableElevation
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Change Password
              </Button>
            </Box>
          </Paper>
        </Stack>
      </Stack>
      <PasswordDialog
        open={openDialog}
        handleClose={handleCloseDialog}
      ></PasswordDialog>
    </React.Fragment>
  );
};
