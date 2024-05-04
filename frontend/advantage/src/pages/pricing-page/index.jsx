import { TopBarHome } from "../../common/top-bar-home";
import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { SubscriptionTypes } from "../company-pages/company-subscription/subscription-types";
import PricingCard from "./pricing-card";
import { Box } from "@mui/material";
const AboutText = styled(Typography)({
  textAlign: "center",
  backgroundColor: "rgba(242, 244, 248, 1)",
  color: "#000080", // Dark blue color
  paddingTop: "50px",
  paddingBottom: "5px",
  fontWeight: "bold", // Added fontWeight: 'bold'
});

const WhoWeAreText = styled(Typography)({
  textAlign: "center",
  backgroundColor: "rgba(242, 244, 248, 1)",
  color: "#000000", // Black color
  fontSize: "1rem",
  marginBottom: "5px",
});

export const PricingPage = () => {
  return (
    <div
      style={{ backgroundColor: "rgba(242, 244, 248, 1)", minHeight: "100vh" }}
    >
      {" "}
      <TopBarHome />
      <AboutText variant="h5">Pricing</AboutText>
      <WhoWeAreText>
        *One credit means one analysis of an advertisement.
      </WhoWeAreText>
      <div
        style={{
          backgroundColor: "rgba(242, 244, 248, 1)",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit,  minmax(360px, 1fr))"
          gap={"20px"}
          padding={"0px 80px 20px 80px"}
          flexWrap={"wrap"}
        >
          <PricingCard plan={SubscriptionTypes.slice(0, 2)}></PricingCard>
          <PricingCard plan={SubscriptionTypes.slice(2, 4)}></PricingCard>
          <PricingCard plan={SubscriptionTypes.slice(4, 6)}></PricingCard>
        </Box>
      </div>
    </div>
  );
};

export default PricingPage;
