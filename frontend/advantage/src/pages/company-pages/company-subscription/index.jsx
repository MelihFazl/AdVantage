import LeftDrawer from "../../../common/left-drawer";
import { CompanyDrawerItems } from "../company-drawer-items";
import { Paper, Button, Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PlanCard from "./plan-card";
import { SubscriptionTypes } from "./subscription-types";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../common/constans";
import AdvSnackbar from "../../../common/adv-snackbar";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

const CreditText = styled(Typography)({
  textAlign: "center",
  color: "#000000", // Black color
  fontSize: "1rem",
  marginBottom: "8px",
});

export const CompanySubscription = () => {
  const matches = useMediaQuery("(min-width:1035px)");
  const [company, setCompany] = useState({});
  const [isCompanyReceived, setIsCompanyReceived] = useState(false);
  const [usage, setUsage] = useState(0);
  const [isUsageReceived, setIsUsageReceived] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [text, setText] = useState("");
  const SNACK_DURATION = 4000;
  const navigate = useNavigate();

  var isReceived = isUsageReceived && isCompanyReceived;

  const openSnack = ({ severity, text }) => {
    setSeverity(severity);
    setText(text);
    setOpen(true);
  };
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/forbidden");
      return;
    }
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
    fetch(BASE_URL + "/company/get?token=" + token, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCompany(result);
        setIsCompanyReceived(true);
      })
      .catch((error) => console.error(error));

    const requestOptions2 = {
      method: "POST",
      redirect: "follow",
    };

    fetch(BASE_URL + "/team/getAllTeams?token=" + token, requestOptions2)
      .then((response) => response.json())
      .then((result) => {
        var usages = 0;
        result.map((value) => {
          usages = usages + value.monthlyAnalysisUsage;
        });
        setUsage(usages);
        setIsUsageReceived(true);
      })
      .catch((error) => console.error(error));
  }, []);

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
        {isReceived ? (
          <React.Fragment>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: "12px",
                minWidth: "500px",
                padding: "10px 30px 10px 30px",
                margin: "0px 50px 8px 50px",
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
                  {company?.subscription?.paymentPlanType === "Free" ? (
                    <React.Fragment>
                      <BoxTitle>{`Your Plan: Starter`}</BoxTitle>
                      <Typography sx={{ color: "white" }}>
                        {`Usage: ${usage} from 50 credit/month`}
                      </Typography>
                      <Typography sx={{ color: "white" }}>
                        {`Renewal Date: ${new Date(
                          company?.subscription?.nextRenewalDate
                        ).toLocaleString("en-US", options)}`}
                      </Typography>
                      <Typography
                        sx={{ color: "white" }}
                      >{`Price: Free`}</Typography>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <BoxTitle>{`Your Plan: ${company?.subscription?.paymentPlanType} (${company?.subscription?.paymentPeriodType})`}</BoxTitle>
                      <Typography sx={{ color: "white" }}>
                        {`Usage: ${usage} from ${
                          company.subscription.usageLimit
                        } credit/${
                          company.subscription.paymentPeriodType === "Monthly"
                            ? "month"
                            : "year"
                        }`}
                      </Typography>
                      <Typography sx={{ color: "white" }}>
                        {`Renewal Date: ${new Date(
                          company?.subscription?.nextRenewalDate
                        ).toLocaleString("en-US", options)}`}
                      </Typography>
                      <Typography
                        sx={{ color: "white" }}
                      >{`Price: ${company.subscription.price}$`}</Typography>
                    </React.Fragment>
                  )}
                </Box>
                {company?.subscription?.paymentPlanType !== "Free" && (
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
                      onClick={() => {
                        var token = localStorage.getItem("userToken");
                        const requestOptions = {
                          method: "POST",
                          redirect: "follow",
                        };
                        const currentDate = new Date();
                        const formattedCurrentDate = `${currentDate.getFullYear()}-${(
                          currentDate.getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}-${currentDate
                          .getDate()
                          .toString()
                          .padStart(2, "0")} ${currentDate
                          .getHours()
                          .toString()
                          .padStart(2, "0")}:${currentDate
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}:${currentDate
                          .getSeconds()
                          .toString()
                          .padStart(2, "0")}`;
                        fetch(
                          BASE_URL +
                            "/company/updateSubscription?token=" +
                            token +
                            "&paymentPlanType=Free&paymentPeriodType=Monthly&createdAt=" +
                            formattedCurrentDate,
                          requestOptions
                        )
                          .then((response) => {
                            if (response.ok) {
                              window.location.reload();
                              openSnack({
                                severity: "success",
                                text: "Subscription cancelled successfully.",
                              });
                              return undefined;
                            } else return response.text();
                          })
                          .then((result) => {
                            if (result) {
                              openSnack({ severity: "error", text: result });
                            }
                          })
                          .catch((error) => console.error(error));
                      }}
                    >
                      Cancel Subscription
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
            <CreditText>
              *One credit corresponds to one analysis of an advertisement.
            </CreditText>
            <Box
              backgroundColor="#FFFFFF"
              display="grid"
              gridTemplateColumns="repeat(auto-fit,  minmax(360px, 1fr))"
              gap={"20px"}
              padding={"0px 80px 20px 80px"}
              flexWrap={"wrap"}
            >
              <PlanCard
                plan={SubscriptionTypes.slice(0, 2)}
                company={company}
                openSnack={openSnack}
              ></PlanCard>
              <PlanCard
                plan={SubscriptionTypes.slice(2, 4)}
                company={company}
                openSnack={openSnack}
              ></PlanCard>
              <PlanCard
                plan={SubscriptionTypes.slice(4, 6)}
                company={company}
                openSnack={openSnack}
              ></PlanCard>
            </Box>
          </React.Fragment>
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
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
