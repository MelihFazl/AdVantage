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
import { BASE_URL } from "../../../common/constans";
import { useNavigate } from "react-router-dom";
import { useMultiAdImageFetch } from "../../../common/use-multi-ad-image-fetch";

export default function ReportDialog({ open, handleClose, report }) {
  const fullScreen = useMediaQuery("(max-width:960px)");
  const toColumn = useMediaQuery("(max-width:1060px)");
  const image = useAdImageFetch(report?.advertisementImage, open);
  const images = useMultiAdImageFetch(report?.advertisementImage, open);
  var textComparisions = [""];
  var series = [];
  var series2 = [];

  if (
    report?.type === "MultipleAdAnalysisReport" ||
    report?.type == "MultipleImageAdAnalysisReport"
  ) {
    textComparisions = JSON.parse(report?.report?.comparison);
    textComparisions?.map((element, index) => {
      series.push({
        data: [
          element.age1317,
          element.age1824,
          element.age2534,
          element.age3544,
          element.age4554,
          element.age5564,
          element.age65,
        ],
        label: "Advertisement " + (index + 1),
      });
      series2.push({
        data: [element.genderM, element.genderF],
        label: "Advertisement " + (index + 1),
      });
    });
  }

  return (
    <Dialog
      scroll="paper"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            height: "100%",
            maxWidth: "1060px",
          },
        },
      }}
      maxWidth="1100px"
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
              sx={{ fontSize: 15 }}
              color="text.secondary"
              gutterBottom
            >
              {report?.report?.uploader?.name +
                " " +
                report?.report?.uploader?.surname}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
            <Typography sx={{ fontSize: 15 }} variant="body2" color={"#000"}>
              Category:
            </Typography>
            <Typography
              sx={{ fontSize: 15 }}
              color="text.secondary"
              gutterBottom
            >
              Political
            </Typography>
          </Box>
          {report?.type === "ImageAdAnalysisReport" ||
          report?.type === "MultipleImageAdAnalysisReport" ? (
            report?.type === "ImageAdAnalysisReport" ? (
              <React.Fragment>
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
                      maxWidth: "250px",
                    }}
                  >
                    <Typography variant="body2" color={"#000"}>
                      Analyzed Image:
                    </Typography>
                    <img
                      name="singleImage"
                      src={image.image}
                      alt="Analyzed Image"
                      style={{
                        height: "100%",
                        width: "350px",
                        objectFit: "cover",
                        marginTop: "4px",
                      }}
                    />
                  </Box>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {!images.isReceived ? (
                  <Box
                    style={{
                      display: "flex",
                      aligItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <CircularProgress></CircularProgress>
                  </Box>
                ) : (
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                    height={"auto"}
                    marginBottom={"10px"}
                    gap="20px"
                  >
                    {images.images.map((element, index) => {
                      return (
                        <Box
                          style={{
                            maxWidth: "250px",
                          }}
                        >
                          <Typography variant="body2" color={"#000"}>
                            {`Analyzed Image ${index + 1}:`}
                          </Typography>
                          <img
                            name={`multiImage${index}`}
                            src={element}
                            alt="Analyzed Image"
                            style={{
                              width: "250px",
                              objectFit: "cover",
                              marginTop: "4px",
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </React.Fragment>
            )
          ) : report?.type === "SingleAdAnalysisReport" ? (
            <React.Fragment>
              <Typography variant="body2" color={"#000"}>
                Content of Ad:
              </Typography>
              <Typography
                sx={{ marginBottom: "2px", fontSize: 15 }}
                color="text.secondary"
              >
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
          {report?.type === "ImageAdAnalysisReport" ||
          report?.type === "MultipleImageAdAnalysisReport" ? (
            report?.type === "ImageAdAnalysisReport" ? (
              <Box display={"flex"} flexDirection={"column"} gap={"3px"}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  gap={"3px"}
                  sx={{ marginTop: "10px" }}
                >
                  <Typography
                    sx={{ fontSize: 15 }}
                    variant="body2"
                    color={"#000"}
                  >
                    Impression of Ad:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {report?.report?.prediction}
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  flexDirection={toColumn ? "column" : "row"}
                  gap={toColumn ? "10px" : "20px"}
                >
                  <Box>
                    <Typography
                      sx={{ fontSize: 15, marginBottom: "3px" }}
                      variant="body2"
                      color={"#000"}
                    >
                      Gender Distribution Plot:
                    </Typography>
                    <div
                      name="GenderBox"
                      style={{
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PieChart
                        sx={{ justifySelf: "center" }}
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
                    </div>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: 15 }}
                      variant="body2"
                      color={"#000"}
                    >
                      Age Distribution Plot:
                    </Typography>
                    <div name="PlotBox">
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
                    </div>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box display={"flex"} flexDirection={"column"} gap={"3px"}>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                  gap="20px"
                >
                  {textComparisions?.map((element, index) => (
                    <Box key={index}>
                      <Typography
                        sx={{ fontSize: 15 }}
                        variant="body2"
                        color="#000"
                      >
                        Impression of Ad {index + 1}:
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {element.prediction}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={toColumn ? "column" : "row"}
                  gap={toColumn ? "10px" : "20px"}
                >
                  <Box>
                    <Typography
                      sx={{ fontSize: 15 }}
                      variant="body2"
                      color={"#000"}
                    >
                      Age Distribution Plot:
                    </Typography>
                    <div name="AgeBox">
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
                        series={series}
                        width={500}
                        height={300}
                      />
                    </div>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: 15 }}
                      variant="body2"
                      color={"#000"}
                    >
                      Gender Distribution Plot:
                    </Typography>
                    <div name="GenderBox">
                      <BarChart
                        xAxis={[
                          {
                            scaleType: "band",
                            data: ["Male", "Female"],
                          },
                        ]}
                        series={series2}
                        width={500}
                        height={300}
                      />
                    </div>
                  </Box>
                </Box>
              </Box>
            )
          ) : report?.type === "SingleAdAnalysisReport" ? (
            <Box display={"flex"} flexDirection={"column"} gap={"3px"}>
              <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
                <Typography
                  sx={{ fontSize: 15 }}
                  variant="body2"
                  color={"#000"}
                >
                  Impression of Ad:
                </Typography>
                <Typography
                  sx={{ fontSize: 15 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {report?.report?.successPrediction}
                </Typography>
              </Box>

              <Box
                display={"flex"}
                flexDirection={toColumn ? "column" : "row"}
                gap={toColumn ? "10px" : "20px"}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: 15, marginBottom: "3px" }}
                    variant="body2"
                    color={"#000"}
                  >
                    Gender Distribution Plot:
                  </Typography>
                  <div
                    name="GenderBox"
                    style={{
                      display: "flex",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                  </div>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: 15 }}
                    variant="body2"
                    color={"#000"}
                  >
                    Age Distribution Plot:
                  </Typography>
                  <div name="PlotBox">
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
                  </div>
                </Box>
              </Box>

              <Typography sx={{ fontSize: 15 }} variant="body2" color={"#000"}>
                Overview:
              </Typography>
              <Typography
                sx={{ fontSize: 15 }}
                color="text.secondary"
                gutterBottom
              >
                {report?.report?.overview}
              </Typography>
            </Box>
          ) : (
            <Box display={"flex"} flexDirection={"column"} gap={"3px"}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                gap="20px"
              >
                {textComparisions?.map((element, index) => (
                  <Box key={index}>
                    <Typography
                      sx={{ fontSize: 15 }}
                      variant="body2"
                      color="#000"
                    >
                      Impression of Ad {index + 1}:
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {element.prediction}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box
                display={"flex"}
                flexDirection={toColumn ? "column" : "row"}
                gap={toColumn ? "10px" : "20px"}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: 15 }}
                    variant="body2"
                    color={"#000"}
                  >
                    Age Distribution Plot:
                  </Typography>
                  <div name="AgeBox">
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
                      series={series}
                      width={500}
                      height={300}
                    />
                  </div>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: 15 }}
                    variant="body2"
                    color={"#000"}
                  >
                    Gender Distribution Plot:
                  </Typography>
                  <div name="GenderBox">
                    <BarChart
                      xAxis={[
                        {
                          scaleType: "band",
                          data: ["Male", "Female"],
                        },
                      ]}
                      series={series2}
                      width={500}
                      height={300}
                    />
                  </div>
                </Box>
              </Box>
              {textComparisions?.map((element, index) => (
                <Box key={index}>
                  <Typography
                    sx={{ fontSize: 15 }}
                    variant="body2"
                    color="#000"
                  >
                    Reccomended Text for Ad {index + 1}:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 15 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {element.textRecommendation}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const requestOptions = {
              method: "DELETE",
              redirect: "follow",
            };
            var token = localStorage.getItem("userToken");
            fetch(
              BASE_URL +
                "/analysisReport/delete?token=" +
                token +
                "&reportId=" +
                report?.report?.reportId +
                "&reportType=" +
                report?.type +
                "&teamId=" +
                report?.report?.team?.teamId,
              requestOptions
            )
              .then((response) => {
                if (response.ok) {
                  window.location.reload();
                }
              })
              .catch((error) => console.error(error));
          }}
        >
          Delete
        </Button>
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
