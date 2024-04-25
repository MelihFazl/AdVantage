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
import { useEffect } from "react";
import { BASE_URL } from "../../../../common/constans";

export default function TeamDialog({ open, handleClose, team }) {
  const fullScreen = useMediaQuery("(max-width:750px)");
  const [dense, setDense] = React.useState(false);
  const [members, setMembers] = React.useState([]);

  useEffect(() => {
    if (open) {
      var token = localStorage.getItem("userToken");
      const requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        BASE_URL +
          "/user/teamMember/getAllByTeamId?teamId=" +
          team.teamId +
          "&token=" +
          token,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else return [];
        })
        .then((result) => {
          setMembers(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      setMembers([]);
    }
  }, [open]);

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
      <DialogTitle id="responsive-dialog-title">{team.teamName}</DialogTitle>
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
              <Typography>{`Usage: ${team.monthlyAnalysisUsage}/${team.usageLimit}`}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Team Members</Typography>
            </Box>
            <List dense={false}>
              {members?.map((member, index) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        var token = localStorage.getItem("userToken");
                        const requestOptions = {
                          method: "POST",
                          redirect: "follow",
                        };

                        fetch(
                          BASE_URL +
                            "/user/teamMember/removeTeam?token=" +
                            token +
                            "&teamMemberId=" +
                            member[0] +
                            "&teamId=" +
                            team.teamId,
                          requestOptions
                        )
                          .then((response) => response.text())
                          .then((result) => console.log(result))
                          .catch((error) => console.error(error));
                        setMembers(
                          members.filter((_, index2) => index2 !== index)
                        );
                      }}
                    >
                      <CloseRoundedIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Person2RoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member[1] + " " + member[2]} />
                </ListItem>
              ))}
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
