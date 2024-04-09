import * as React from "react";
import { styled } from "@mui/system";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordion = styled(Accordion)({
  marginTop: "20px", // Adjusted margin for better spacing
});

const StyledAccordionSummary = styled(AccordionSummary)({});

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});

export default function QuestionItem({ question, answer }) {
  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <StyledTypography>{question}</StyledTypography>
      </StyledAccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </StyledAccordion>
  );
}
