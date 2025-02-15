import { TopBarHome } from "../../common/top-bar-home";
import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Container, LinearProgress } from "@mui/material";
import DeveloperCard from "./developer-card";
import { useAboutImages } from "./use-about-images";
const AboutText = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  marginTop: "50px",
  fontWeight: "bold", // Added fontWeight: 'bold'
});

const WhoWeAreText = styled(Typography)({
  textAlign: "center",
  color: "#000000", // Black color
  fontSize: "2rem",
});

const DeveloperCardsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Adjust column width as needed
  marginTop: "20px",
  gap: "12px",
});

export const AboutUsPage = () => {
  const images = useAboutImages();
  return (
    <div
      style={{ backgroundColor: "rgba(242, 244, 248, 1)", minHeight: "100vh" }}
    >
      <TopBarHome />
      {!images.isReceived && <LinearProgress></LinearProgress>}
      <Container padding="0 100px 50px 100px" marginbottom="50px">
        <AboutText variant="h5">ABOUT</AboutText>
        <WhoWeAreText>Who we are? Your trust is what we need!</WhoWeAreText>
        {images.isReceived && (
          <DeveloperCardsContainer>
            <DeveloperCard
              name="Kerem Şahin"
              title="Part-Time Researcher @Bilkent University Software Engineering and Data Analytics Research Group"
              image={images.keremImage}
            ></DeveloperCard>
            <DeveloperCard
              name="Kutay Şenyiğit"
              title="Game Developer : Partnered with the biggest company in the industry"
              image={images.kutayImage}
            ></DeveloperCard>
            <DeveloperCard
              name="Miray Ayerdem"
              title="Part-Time Researcher @Bilkent University Software Engineering and Data Analytics Research Group"
              image={images.mirayImage}
            ></DeveloperCard>
            <DeveloperCard
              name="Utku Kurtulmuş"
              title="Backend Developer @AdVantage"
              image={images.utkuImage}
            ></DeveloperCard>
            <DeveloperCard
              name="Melih Fazıl Keskin"
              title="Part-time Software Engineer @ Actioner"
              image={images.melihImage}
            ></DeveloperCard>
          </DeveloperCardsContainer>
        )}
      </Container>
    </div>
  );
};
