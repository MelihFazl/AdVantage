import { Link } from "react-router-dom";
import { TopBarHome } from "../../common/top-bar-home";
import React from 'react';
import { styled } from '@mui/material/styles';
import aboutImage from '../../assets/images/about.png';
import { Typography, Button, Card, CardContent, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutText = styled(Typography)({
  textAlign: 'center',
  color: '#000080', // Dark blue color
  marginTop: '20px',
  fontWeight: 'bold', // Added fontWeight: 'bold'
});

const WhoWeAreText = styled(Typography)({
  textAlign: 'center',
  color: '#000000', // Black color
  fontSize: '2rem',
  marginTop: '20px',
});

const AboutImageCard = styled(Card)({
  borderRadius: '15px',
  margin: '20px auto',
  overflow: 'hidden',
  width: '100%', // Set to 100% width
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const AboutImage = styled('img')({
  width: '100%', // Set to 100% width
  height: 'auto',
  borderRadius: '15px',
});


export const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'rgba(242, 244, 248, 1)', minHeight: '100vh' }}>
      <TopBarHome />
      <Container maxWidth="md">
        <AboutText variant="h5">ABOUT</AboutText>
        <WhoWeAreText>Who we are? Your trust is what we need!</WhoWeAreText>

        <AboutImageCard>
          <AboutImage src={aboutImage} alt="About Us" />
          <CardContent>
            {/* Additional content can be added here */}
          </CardContent>
        </AboutImageCard>

        {/* Additional content can be added below the image */}
      </Container>
    </div>
  );
}

export default AboutUsPage;
