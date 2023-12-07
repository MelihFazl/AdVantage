import React from 'react';
import { styled } from '@mui/system';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { TopBarHome } from "../../common/top-bar-home"; 

const FAQTEXT = styled(Typography)({
  textAlign: 'center',
  color: '#000080', // Dark blue color
  marginTop: '20px',
  fontWeight: 'bold', // Added fontWeight: 'bold'
});

const StyledAccordion = styled(Accordion)({
  marginTop: '20px', // Adjusted margin for better spacing

});

const StyledAccordionSummary = styled(AccordionSummary)({

});

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
});

export const FaqPage = () => {
  const navigate = useNavigate();
  
  return( 
    <div style={{ backgroundColor: 'rgba(242, 244, 248, 1)', minHeight: '100vh' }}>
      <TopBarHome />
      <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>
          <FAQTEXT variant="h5">FAQ</FAQTEXT>
          Frequently Asked Questions
        </Typography>
        <StyledAccordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <StyledTypography>What is Advantage?</StyledTypography>
          </StyledAccordionSummary>
          <AccordionDetails>
            <Typography>
              Advantage is a platform dedicated to helping marketing professionals and developers succeed in the 
              fast-evolving realm of digital advertising. We provide actionable strategies and intelligent solutions to 
              simplify digital advertising and leverage advanced technology to transform how advertising is done.
            </Typography>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <StyledTypography>How can Advantage help my business?</StyledTypography>
          </StyledAccordionSummary>
          <AccordionDetails>
            <Typography>
              Our mission is to make digital advertising more efficient and cost-effective. By offering smart solutions 
              and practical strategies, we help businesses achieve their marketing goals without excessive spending, 
              thereby improving your overall digital advertising experience.
            </Typography>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <StyledTypography>What makes Advantage different from other advertising platforms?</StyledTypography>
          </StyledAccordionSummary>
          <AccordionDetails>
            <Typography>
              Advantage stands out by focusing on advanced technologies that anticipate the future needs of digital 
              marketing. Our approach is to shape the future of digital advertising by providing innovative tools and 
              insights that are not only practical but also ahead of the curve.
            </Typography>
          </AccordionDetails>
        </StyledAccordion>
        {/* Repeat the StyledAccordion component for each FAQ item */}
      </div>
    </div>
  );
}

export default FaqPage;
