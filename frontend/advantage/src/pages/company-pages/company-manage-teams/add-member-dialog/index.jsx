import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { BASE_URL } from "../../../../common/constans";
import { areEquivalentMembers } from "../../../../common/areEquivalentMembers";

export default function AddMemberDialog({
  open,
  handleClose,
  team,
  openSnack,
}) {
  const theme = useTheme();
  const [memberName, setMemberName] = useState([]);
  const [members, setMembers] = useState([]);
  const [isReceived, setIsReceived] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setMemberName([]);
      var token = localStorage.getItem("userToken");
      //Get all members
      const requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        BASE_URL + "/user/teamMember/getAllByCompany?token=" + token,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else return [];
        })
        .then((result) => {
          var allMembers = result;
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
            .then((response2) => {
              if (response2.ok) {
                return response2.json();
              } else return [];
            })
            .then((result2) => {
              var teamMembers = result2;
              setMembers(
                allMembers.filter(
                  (obj1) =>
                    !teamMembers.some((obj2) =>
                      areEquivalentMembers(obj1, obj2)
                    )
                )
              );
              setIsReceived(true);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    } else {
      setIsReceived(false);
    }
  }, [open]);

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
    isReceived && (
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
            <Typography>
              {members.length > 0
                ? "Select Members"
                : "You don't have any members in your company that are not in " +
                  team.teamName +
                  "."}
            </Typography>
            {members.length > 0 && (
              <Select
                id="team"
                multiple
                value={memberName}
                onChange={handleChange}
                size="small"
              >
                {members.map((member) => (
                  <MenuItem
                    key={member[0]}
                    value={member[0]}
                    style={getStyles(
                      member[1] + " " + member[2],
                      memberName,
                      theme
                    )}
                  >
                    {member[1] + " " + member[2]}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          {members.length > 0 && (
            <Button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                memberName.map((id) => {
                  const requestOptions = {
                    method: "POST",
                    redirect: "follow",
                  };
                  var token = localStorage.getItem("userToken");
                  fetch(
                    BASE_URL +
                      "/user/teamMember/assignTeam?token=" +
                      token +
                      "&teamMemberId=" +
                      id +
                      "&teamId=" +
                      team.teamId,
                    requestOptions
                  )
                    .then((response) => {
                      if (response.ok) {
                        handleClose();
                        openSnack({
                          severity: "success",
                          text: "Members are added successfully",
                        });
                        setLoading(false);
                        return undefined;
                      } else return response.text();
                    })
                    .then((result) => {
                      if (result) {
                        openSnack({ severity: "error", text: result });
                      }
                      setLoading(false);
                    })
                    .catch((error) => console.error(error));
                });
              }}
              color="primary"
            >
              {loading ? (
                <CircularProgress
                  style={{ height: "24.5px", width: "24.5px" }}
                  color="inherit"
                ></CircularProgress>
              ) : (
                "Add"
              )}
            </Button>
          )}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
