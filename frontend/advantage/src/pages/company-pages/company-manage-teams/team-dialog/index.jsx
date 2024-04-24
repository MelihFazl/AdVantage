import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";

export default function TeamDialog({ open, handleClose, team }) {
  const fullScreen = useMediaQuery("(max-width:750px)");
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

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
      <DialogTitle id="responsive-dialog-title">{"Team Name"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"3px"}
            minWidth={"250px"}
          >
            <Box
              position={"sticky"}
              top={0}
              backgroundColor="#FFFFFF"
              zIndex={10}
              gap="5px"
              display={"flex"}
              flexDirection={"column"}
            >
              <Typography>{`Usage: 1234/5000`}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Team Members</Typography>
            </Box>
            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <CloseRoundedIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Person2RoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Single-line item" />
                </ListItem>
              )}
            </List>
          </Box>
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
