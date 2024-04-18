import LeftDrawer from "../../../common/left-drawer";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { TeamMemberDrawerItems } from "../team-member-drawer-items";
import {
  Paper,
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form, Field } from "react-final-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { isFieldEmpty } from "../../../common/validator-functions/isFieldEmpty";
import { BASE_URL } from "../../../common/constans";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamText = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "32px",
  marginLeft: "50px",
  marginRight: "50px",
});

const BannerText = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "20px",
});

const DevelopmentText = styled(Typography)({
  textAlign: "center",
  color: "#000080", // Dark blue color
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "100px",
});

export const TeamMemberImageAnalysisPage = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:897px)");
  const [imageSrc, setImageSrc] = useState("");
  const [teams, setTeams] = useState([]);

  function base64ToBlob(base64, mimeType) {
    const bytes = atob(base64.split(",")[1]);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
    }
    return new Blob([arr], { type: mimeType });
  }

  useEffect(() => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    var token = localStorage.getItem("userToken");
    fetch(BASE_URL + "/team/getAllMemberTeams?token=" + token, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTeams(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Stack direction={"row"}>
      <LeftDrawer drawerItems={TeamMemberDrawerItems}></LeftDrawer>
      <Stack
        direction="column"
        width="100%"
        position={"relative"}
        margin={0}
        padding={0}
        backgroundColor={"#FFFFFF"}
      >
        <Box
          minWidth={"530px"}
          display={"flex"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"auto"}
          alignItems="center"
          justifyContent="center"
          position={"sticky"}
          paddingTop={"8px"}
          top={0}
          backgroundColor={"#FFFFFF"}
          zIndex={2}
        >
          <BannerText>Advantage Advertisement Suggestion Tool</BannerText>
        </Box>
        <Box
          minWidth={"530px"}
          display={"flex"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"auto"}
          justifyContent="center"
          alignItems="center"
          position={"sticky"}
          backgroundColor={"#FFFFFF"}
          paddingBottom={"20px"}
          top={38}
          zIndex={2}
        >
          <TeamText>Analyze image based advertisements</TeamText>
        </Box>
        <Form
          keepDirtyOnReinitialize
          onSubmit={(values) => {
            const currentDate = new Date();
            const formattedCurrentDate = `${currentDate.getFullYear()}-${(
              currentDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${currentDate
              .getDate()
              .toString()
              .padStart(2, "0")} ${currentDate
              .getHours()
              .toString()
              .padStart(2, "0")}:${currentDate
              .getMinutes()
              .toString()
              .padStart(2, "0")}:${currentDate
              .getSeconds()
              .toString()
              .padStart(2, "0")}`;

            let formData = new FormData();
            formData.append("file", base64ToBlob(imageSrc, "image/jpeg"));
            fetch(
              BASE_URL +
                `/imageanalysisreport/create?token=${localStorage.getItem(
                  "userToken"
                )}&createdAt=${formattedCurrentDate}&title=${
                  values.reportTitle
                }&teamId=${values.team}&category=${values.adCategory}`,
              {
                method: "POST",
                body: formData,
              }
            )
              .then((response) => {
                if (response.ok) navigate("/team-member");
                else;
                //TODO
              })
              .catch((error) => console.error(error));
          }}
          initialValues={{ adCategory: "Political", adContents: [""] }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                padding={"0px 20px 20px 20px"}
                gap={"16px"}
                position={"relative"}
              >
                {" "}
                <Paper
                  variant="outlined"
                  sx={{
                    display: "block",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "20px 30px 20px 30px",
                    borderRadius: "12px",
                    flexGrow: "4",
                    minWidth: "300px",
                    height: "fit-content",
                    position: matches ? "sticky" : "relative",
                    top: matches ? 106 : 0,
                  }}
                >
                  <Stack direction={"column"} gap={"8px"}>
                    <Field
                      name="reportTitle"
                      validate={isFieldEmpty("Report title must be entered.")}
                    >
                      {({ input, meta }) => (
                        <Box
                          display={"flex"}
                          alignSelf={"stretch"}
                          flexDirection={"column"}
                          gap={"4px"}
                        >
                          <Typography>Report Title</Typography>
                          <TextField
                            {...input}
                            error={meta.touched && meta.error ? true : false}
                            variant="outlined"
                            helperText={
                              meta.touched && meta.error ? meta.error : ""
                            }
                            size="small"
                          />
                        </Box>
                      )}
                    </Field>
                    <Field name="adCategory">
                      {({ input }) => (
                        <Box
                          display={"flex"}
                          alignSelf={"stretch"}
                          flexDirection={"column"}
                          gap={"4px"}
                        >
                          <Typography>Category of Ad(s)</Typography>
                          <Select {...input} size="small">
                            <MenuItem value={"Political"}>Political</MenuItem>
                          </Select>
                        </Box>
                      )}
                    </Field>
                    <Field
                      name="team"
                      validate={(value) => {
                        return value ? undefined : "Team must be selected.";
                      }}
                    >
                      {({ input, meta }) => (
                        <Box
                          display={"flex"}
                          alignSelf={"stretch"}
                          flexDirection={"column"}
                          gap={"4px"}
                        >
                          <Typography>Team</Typography>
                          <FormControl error={meta.touched && meta.error}>
                            <Select {...input} size="small">
                              {teams.map((team) => (
                                <MenuItem value={team.teamId}>
                                  {team.teamName}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {meta.touched && meta.error ? meta.error : ""}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      )}
                    </Field>
                    <Field name="targetLocation">
                      {({ input }) => (
                        <Box
                          display={"flex"}
                          alignSelf={"stretch"}
                          flexDirection={"column"}
                          gap={"4px"}
                        >
                          <Typography color={"text.secondary"}>
                            Target Location (Coming soon...)
                          </Typography>
                          <Select {...input} size="small" disabled></Select>
                        </Box>
                      )}
                    </Field>
                    <Field name="targetAge">
                      {({ input }) => (
                        <Box
                          display={"flex"}
                          alignSelf={"stretch"}
                          flexDirection={"column"}
                          gap={"4px"}
                        >
                          <Typography color={"text.secondary"}>
                            Target Age (Coming soon...)
                          </Typography>
                          <Select {...input} size="small" disabled></Select>
                        </Box>
                      )}
                    </Field>
                  </Stack>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    display: "block",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "20px 30px 20px 30px",
                    borderRadius: "12px",
                    flexGrow: "6",
                    minWidth: "460px",
                    height: "fit-content",
                    gap: "12px",
                  }}
                >
                  <Stack direction={"column"} gap={"12px"}>
                    <Stack
                      direction={"column"}
                      gap={"12px"}
                      alignItems={"center"}
                    >
                      <Field
                        name="imageContent"
                        validate={isFieldEmpty("Image must be uploaded.")}
                      >
                        {({ input: { onChange, ...input }, meta }) => (
                          <label htmlFor="file-input">
                            <Box
                              sx={{
                                height: 248,
                                width: 410,
                                position: "relative",
                                backgroundColor: "#f0f0f0", // Light gray background
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              {imageSrc ? (
                                <img
                                  src={imageSrc}
                                  alt="Uploaded"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <AddPhotoAlternateRoundedIcon
                                  style={{ fontSize: "100px", color: "gray" }}
                                />
                              )}
                              <input
                                type="file"
                                id="file-input"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={(event) => {
                                  handleImageChange(event);
                                  onChange(event); // Updates the form state
                                }}
                              />
                              {meta.touched && meta.error ? meta.error : ""}
                            </Box>
                          </label>
                        )}
                      </Field>
                    </Stack>
                    <Button variant="contained" disableElevation type="submit">
                      Analyze
                    </Button>
                  </Stack>
                </Paper>
              </Stack>
            </form>
          )}
        ></Form>
      </Stack>
    </Stack>
  );
};
