import React from "react";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import FormatSizeRoundedIcon from "@mui/icons-material/FormatSizeRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import BurstModeRoundedIcon from "@mui/icons-material/BurstModeRounded";

function ReportTypeComponent({ reportType }) {
  switch (reportType) {
    case "SingleAdAnalysisReport":
      return <TitleRoundedIcon />;
    case "MultipleAdAnalysisReport":
      return <FormatSizeRoundedIcon />;
    case "ImageAdAnalysisReport":
      return <PhotoRoundedIcon />;
    case "MultipleImageAdAnalysisReport":
      return <BurstModeRoundedIcon />;
    default:
      return <div></div>;
  }
}

export default ReportTypeComponent;