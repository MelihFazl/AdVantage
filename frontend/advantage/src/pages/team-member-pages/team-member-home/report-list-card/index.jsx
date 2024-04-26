import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ReportListCard({ report, onReportCardClick }) {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 263.2, height: 230, borderRadius: "8px" }}
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
            {report.type === "ImageAdAnalysisReport" ? (
              <React.Fragment>
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  {
                    "This is an image ad analysis report. Click to card to see details of advertisement."
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
                    ? report.advertisementText
                    : "This report contains more than one add that is analyzed. Click to card to see details about all " +
                      report.advertisementTexts.length +
                      " advertisements"}
                </Typography>
              </React.Fragment>
            )}
          </Box>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
