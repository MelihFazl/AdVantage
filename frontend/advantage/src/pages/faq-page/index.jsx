import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { TopBarHome } from "../../common/top-bar-home";
import QuestionItem from "./question-item";

const FAQTEXT = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  marginTop: "20px",
  fontWeight: "bold", // Added fontWeight: 'bold'
});

export const FaqPage = () => {
  return (
    <div
      style={{ backgroundColor: "rgba(242, 244, 248, 1)", minHeight: "100vh" }}
    >
      <TopBarHome />
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          <FAQTEXT variant="h5">FAQ</FAQTEXT>
          Frequently Asked Questions
        </Typography>
        <QuestionItem
          question={"What is Advantage?"}
          answer={
            "Advantage is a platform dedicated to helping marketing professionals and developers succeed in the fast-evolving realm of digital advertising. We provide actionable strategies and intelligent solutions to simplify digital advertising and leverage advanced technology to transform how advertising is done."
          }
        ></QuestionItem>
        <QuestionItem
          question={"How can Advantage help my business?"}
          answer={
            "Our mission is to make digital advertising more efficient and cost-effective. By offering smart solutions and practical strategies, we help businesses achieve their marketing goalswithout excessive spending, thereby improving your overall digitaladvertising experience."
          }
        ></QuestionItem>
        <QuestionItem
          question={
            "What makes Advantage different from other advertising platforms?"
          }
          answer={
            "Advantage stands out by focusing on advanced technologies that anticipate the future needs of digital marketing. Our approach is to shape the future of digital advertising by providing innovative tools and insights that are not only practical but also ahead of the curve."
          }
        ></QuestionItem>
      </div>
    </div>
  );
};

export default FaqPage;
