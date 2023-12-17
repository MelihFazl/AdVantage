import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography, useMediaQuery } from "@mui/material";

export default function ReportDialog({ open, handleClose, report }) {
  const fullScreen = useMediaQuery("(max-width:750px)");

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
          {report?.type === "SingleAdAnalysisReport" ? (
            <Typography sx={{ mb: 1.2 }} color="text.secondary">
              CPI of Ad: {report?.report?.successPrediction}
            </Typography>
          ) : (
            report?.report?.comparison?.split(" ")?.map((element, index) => {
              return (
                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                  CPI of Ad{index + 1}: {element}
                </Typography>
              );
            })
          )}

          {report?.type === "SingleAdAnalysisReport" ? (
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
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
