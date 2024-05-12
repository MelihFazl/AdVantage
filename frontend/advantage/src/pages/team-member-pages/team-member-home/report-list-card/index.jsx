import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import ReportTypeComponent from "./report-type-icon";

export default function ReportListCard({ report, onReportCardClick }) {

  const getBorderColor = () => {
    switch (report.type) {
      case "ImageAdAnalysisReport":
        return "#F29886"; // Red border for image ad reports
      case "MultipleImageAdAnalysisReport":
        return "#7ADE8B"; // Green border for multiple image ad reports
      case "SingleAdAnalysisReport":
        return "#7576D3"; // Blue border for single textual ad reports
      default:
        return "#86F1F2"; // Default border color
    }
  };
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 263.2, height: 230, borderRadius: "12px", borderWidth: "3px", }}
    >
      <CardActionArea
        onClick={() => {
          onReportCardClick(report);
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {report.report.title}
          </Typography>
          <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Uploaded by:
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {report.report.uploader.name +
                " " +
                report.report.uploader.surname}
            </Typography>
          </Box>
          <Box
            height={"120px"}
            text-overflow="ellipsis"
            white-space="nowrap"
            overflow="hidden"
          >
            {report.type === "ImageAdAnalysisReport" ||
            report.type === "MultipleImageAdAnalysisReport" ? (
              <React.Fragment>
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  {report.type === "ImageAdAnalysisReport"
                  ? "This is a single image advertisement analysis report. Click to card to see details of advertisement."
                  : "This image advertisement report contains more than one add that is analyzed. Click to card to see details about all advertisements"
                  }
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {" "}
                <Typography variant="body2" color={"#000"}>
                  Content of report's ad:
                </Typography>
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  {report.type === "SingleAdAnalysisReport"
                    ? "This is a single textual advertisement analysis report. Click to card to see details of advertisement."
                    : "This textual advertisement report contains more than one add that is analyzed. Click to card to see details about all " +
                      report.advertisementTexts.length +
                      " advertisements"}
                </Typography>
              </React.Fragment>
            )}
          </Box>
          <Box display="flex" flexDirection="row" justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Category:
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Political
              </Typography>
            </Box>
            <ReportTypeComponent reportType={report.type}></ReportTypeComponent></Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
