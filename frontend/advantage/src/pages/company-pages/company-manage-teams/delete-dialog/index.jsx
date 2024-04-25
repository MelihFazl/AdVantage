import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { BASE_URL } from "../../../../common/constans";

export default function DeleteDialog({ open, handleClose, team, openSnack }) {
  function handleYes() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    var token = localStorage.getItem("userToken");
    fetch(
      BASE_URL + "/team/removeTeam?token=" + token + "&teamId=" + team.teamId,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          window.location.reload();
          openSnack({
            severity: "success",
            text: "Team deleted successfully",
          });
          return undefined;
        } else return response.text();
      })
      .then((result) => {
        if (result) {
          openSnack({ severity: "error", text: result });
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <Typography>Do you really want to delete this team?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleYes} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
