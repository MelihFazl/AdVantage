import LeftDrawer from "../../../common/left-drawer";
import { CompanyDrawerItems } from "../company-drawer-items";
import { Paper, Button, Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PlanCard from "./plan-card";

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
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "28px",
  color: "#FFFFFF",
});

export const CompanySubscription = () => {
  const matches = useMediaQuery("(min-width:1035px)");
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
          maxWidth={"%100"}
          flexDirection={"column"}
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
          <TeamText>Manage your subscription</TeamText>
        </Box>
        <Paper
          variant="outlined"
          sx={{
            borderRadius: "12px",
            minWidth: "500px",
            padding: "10px 30px 10px 30px",
            margin: "0px 50px 30px 50px",
          }}
          style={{
            background: "#7979f2",
            border: "4px solid #6f6ff2",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: matches ? "row" : "column",
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
              <BoxTitle>{`Your Plan: Starter (Annual)`}</BoxTitle>
              <Typography sx={{ color: "white" }}>
                {`Usage: 12345 from 100000 credit/year`}
              </Typography>
              <Typography sx={{ color: "white" }}>
                {`Renewal Date: 11/22/63`}
              </Typography>
            </Box>
            <Box
              alignSelf={"center"}
              marginTop={matches ? 0 : "8px"}
              fullWidth={!matches}
            >
              <Button
                disableElevation
                variant="contained"
                fullWidth={!matches}
                color="warning"
                sx={{ borderRadius: "12px" }}
              >
                Cancel Subscription
              </Button>
            </Box>
          </Box>
        </Paper>
        <Box
          backgroundColor="#FFFFFF"
          display="grid"
          gridTemplateColumns="repeat(auto-fit,  minmax(360px, 1fr))"
          gap={"20px"}
          padding={"0px 80px 20px 80px"}
          flexWrap={"wrap"}
        >
          {" "}
          <PlanCard></PlanCard> <PlanCard></PlanCard> <PlanCard></PlanCard>
        </Box>
      </Stack>
    </Stack>
  );
};
