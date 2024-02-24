import { TopBarHome } from "../../common/top-bar-home";
import React from "react";
import { styled } from "@mui/material/styles";
import melihImage from "../../assets/images/melih.jpeg";
import mirayImage from "../../assets/images/miray.jpeg";
import { Typography, Card, CardContent, Container } from "@mui/material";
import DeveloperCard from "./developer-card";

const AboutText = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  marginTop: "20px",
  fontWeight: "bold", // Added fontWeight: 'bold'
});

const WhoWeAreText = styled(Typography)({
  textAlign: "center",
  color: "#000000", // Black color
  fontSize: "2rem",
  marginTop: "20px",
});

const AboutImageCard = styled(Card)({
  borderRadius: "15px",
  margin: "20px auto",
  overflow: "hidden",
  width: "100%", // Set to 100% width
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const AboutImage = styled("img")({
  width: "100%", // Set to 100% width
  height: "auto",
  borderRadius: "15px",
});

const DeveloperCardsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Adjust column width as needed
  marginTop: "20px",
  gap: "12px",
});

export const AboutUsPage = () => {
  return (
    <div
      style={{ backgroundColor: "rgba(242, 244, 248, 1)", minHeight: "100vh" }}
    >
      <TopBarHome />
      <Container padding="0 100px 50px 100px" marginBottom="50px">
        <AboutText variant="h5">ABOUT</AboutText>
        <WhoWeAreText>Who we are? Your trust is what we need!</WhoWeAreText>

        <DeveloperCardsContainer>
          <DeveloperCard
            name="Kerem Şahin"
            title="Part-Time Researcher @Bilkent University Software Engineering and Data Analytics Research Group"
            image={melihImage}
          ></DeveloperCard>
          <DeveloperCard
            name="Kutay Şenyiğit"
            title="Game Developer : Partnered with the biggest company in the industry"
            image={melihImage}
          ></DeveloperCard>
          <DeveloperCard
            name="Miray Ayerdem"
            title="Part-Time Researcher @Bilkent University Software Engineering and Data Analytics Research Group"
            image={mirayImage}
          ></DeveloperCard>
          <DeveloperCard
            name="Utku Kurtulmuş"
            title="Full-Time Bilkent CS Senior Student"
            image={melihImage}
          ></DeveloperCard>
          <DeveloperCard
            name="Melih Fazıl Keskin"
            title="Part-time Software Engineer @ Actioner"
            image={melihImage}
          ></DeveloperCard>
        </DeveloperCardsContainer>
      </Container>
    </div>
  );
};

export default AboutUsPage;
