import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CreateTeamForm from "../creation-tabs/create-team";

export default function EditDialog({ open, handleClose, team, initialValues }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Team</DialogTitle>
      <DialogContent>
        <CreateTeamForm
          initialValues={initialValues}
          isEdit={true}
        ></CreateTeamForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Save Changes
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
