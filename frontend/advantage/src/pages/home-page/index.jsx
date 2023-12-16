import { TopBarHome } from "../../common/top-bar-home";
import React from "react";
import { styled } from "@mui/material/styles";
import yourImage from "../../assets/images/home.png";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Section1 = styled("div")({
  backgroundColor: `rgba(242, 244, 248, 1)`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  width: `100%`, // Adjusted to 100% width
  height: "fit-content",
  justifcontent: `flex-start`,
  alignItems: `flex-start`,
  padding: `80px 80px 0px 80px`,
  boxSizing: `border-box`,
});

const Content = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `flex-start`,
  padding: `80px 0px`,
  boxSizing: `border-box`,
  flex: `1`,
  margin: `0px`,
  height: "fit-content",
  width: `100%`, // Adjusted to 100% width
});

const Description = styled("div")({
  marginBottom: `24px`,
});

const ButtonsGroup = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  margin: `64px 0px 0px 0px`,
  height: `56px`,
  width: `260px`,
});

const Right = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `column`, // Adjusted to column
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  width: `513px`,
  height: "513px",
  margin: `0px 50px 0px 80px`,
  overflow: `hidden`,
  backgroundImage: `url(${yourImage})`, // Added background image
  backgroundSize: "cover", // Ensures the image covers the container
});

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: "rgba(242, 244, 248, 1)", minHeight: "100vh" }}
    >
      <TopBarHome />
      <Section1>
        <Content>
          <Description>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: "bold", marginBottom: "16px" }}
            >
              Advantage
            </Typography>
            <Typography variant="body1" paragraph>
              Helping marketing professionals and developers succeed in the
              fast-changing world of digital advertising. We want to make
              digital advertising easier by providing practical strategies and
              smart solutions. Using advanced technology, we aim to change how
              advertising works, making it possible for businesses to succeed
              without spending a lot of money on marketing. Our mission is to
              improve the digital advertising experience, shaping the future of
              digital marketing.
            </Typography>
            <ButtonsGroup>
              <Button
                variant="contained"
                disableElevation
                style={{ textTransform: "none", marginRight: "16px" }}
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                style={{ textTransform: "none" }}
                onClick={() => navigate("/faq")}
              >
                FAQ
              </Button>
            </ButtonsGroup>
          </Description>
        </Content>
        <Right />
      </Section1>
    </div>
  );
};

export default HomePage;
