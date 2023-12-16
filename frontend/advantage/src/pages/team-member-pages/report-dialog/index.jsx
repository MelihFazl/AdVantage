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
      <DialogTitle id="responsive-dialog-title">{report.title}</DialogTitle>
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
              Name Surname
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
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            -CPI of Ad1: 123
          </Typography>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            -CPI of Ad2: 12
          </Typography>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            -CPI of Ad3: 1
          </Typography>
          <Typography variant="body2" color={"#000"}>
            Content of Ad1:
          </Typography>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            {report.content}
          </Typography>
          <Typography variant="body2" color={"#000"}>
            Content of Ad2:
          </Typography>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            {report.content}
          </Typography>
          <Typography variant="body2" color={"#000"}>
            Content of Ad3:
          </Typography>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            {report.content}
          </Typography>
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
