import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";

export default function AddMemberDialog({ open, handleClose, team }) {
  const theme = useTheme();
  const [memberName, setMemberName] = useState([]);

  useEffect(() => {
    if (open) {
      setMemberName([]);
    }
  }, [open]);

  const members = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMemberName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(member, memberName, theme) {
    return {
      fontWeight:
        memberName.indexOf(member) === -1
          ? theme.typography?.fontWeightRegular ?? "normal"
          : theme.typography?.fontWeightMedium ?? "bold",
    };
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Member(s)</DialogTitle>
      <DialogContent>
        <Box
          display={"flex"}
          alignSelf={"stretch"}
          flexDirection={"column"}
          gap={"4px"}
          minWidth={"500px"}
        >
          <Typography>Select Members</Typography>
          <Select
            id="team"
            multiple
            value={memberName}
            onChange={handleChange}
            size="small"
          >
            {members.map((member) => (
              <MenuItem
                key={member}
                value={member}
                style={getStyles(member, memberName, theme)}
              >
                {member}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
