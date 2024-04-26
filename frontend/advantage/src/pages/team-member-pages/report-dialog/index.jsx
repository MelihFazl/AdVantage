import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { generatePDF } from "../../../common/generate-pdf";
import { useAdImageFetch } from "../../../common/use-ad-image-fetch";

export default function ReportDialog({ open, handleClose, report }) {
  const fullScreen = useMediaQuery("(max-width:750px)");
  const image = useAdImageFetch(report?.advertisementImage, open);

  return (
    <Dialog
      scroll="paper"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            height: "100%",
          },
        },
      }}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {report?.report?.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
            <Typography variant="body2" color={"#000"}>
              Uploaded by:
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {report?.report?.uploader?.name +
                " " +
                report?.report?.uploader?.surname}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
            <Typography sx={{ fontSize: 14 }} variant="body2" color={"#000"}>
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
          <Typography variant="body2" color={"#000"}>
            Results:
          </Typography>
          {report?.type !== "ImageAdAnalysisReport" &&
            (report?.type === "SingleAdAnalysisReport" ? (
              <Box display={"flex"} flexDirection={"column"} gap={"3px"}>
                {" "}
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  Impression of Ad: {report?.report?.successPrediction}
                </Typography>
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  Gender Distribution Plot:
                </Typography>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: report?.report?.genderM,
                          label: "Male",
                          color: "orange",
                        },
                        {
                          id: 1,
                          value: report?.report?.genderF,
                          label: "Female",
                          color: "purple",
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  Age Distribution Plot:
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: [
                        "13-17",
                        "18-24",
                        "25-34",
                        "35-44",
                        "45-54",
                        "55-64",
                        "65+",
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: [
                        report.report.age1317,
                        report.report.age1824,
                        report.report.age2534,
                        report.report.age3544,
                        report.report.age4554,
                        report.report.age5564,
                        report.report.age65,
                      ],
                    },
                  ]}
                  width={500}
                  height={300}
                />
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  Overview: {report?.report?.overview}
                </Typography>
              </Box>
            ) : (
              report?.report?.comparison?.split(" ")?.map((element, index) => {
                return (
                  <Typography sx={{ mb: 1.2 }} color="text.secondary">
                    CPI of Ad{index + 1}: {element}
                  </Typography>
                );
              })
            ))}

          {report?.type === "ImageAdAnalysisReport" ? (
            <React.Fragment>
              <Typography variant="body2" color={"#000"}>
                Analyzed Image:
              </Typography>
              {image.image === "" ? (
                <Box
                  style={{
                    display: "flex",
                    aligItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress></CircularProgress>
                </Box>
              ) : (
                <Box
                  style={{
                    maxWidth: "%100",
                  }}
                >
                  <img
                    src={image.image}
                    alt="Analyzed Image"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </React.Fragment>
          ) : report?.type === "SingleAdAnalysisReport" ? (
            <React.Fragment>
              <Typography variant="body2" color={"#000"}>
                Content of Ad:
              </Typography>
              <Typography sx={{ mb: 1.2 }} color="text.secondary">
                {report.advertisementText}
              </Typography>
            </React.Fragment>
          ) : (
            report?.advertisementTexts?.map((element, index) => {
              return (
                <React.Fragment>
                  <Typography variant="body2" color={"#000"}>
                    Content of Ad{index + 1}:
                  </Typography>
                  <Typography sx={{ mb: 1.2 }} color="text.secondary">
                    {element}
                  </Typography>
                </React.Fragment>
              );
            })
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            generatePDF(report);
          }}
        >
          Export as PDF
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
