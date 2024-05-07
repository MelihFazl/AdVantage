import LeftDrawer from "../../../common/left-drawer";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { TeamMemberDrawerItems } from "../team-member-drawer-items";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Paper,
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Collapse,
  Button,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import arrayMutators from "final-form-arrays";
import { Form, Field } from "react-final-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { isFieldEmpty } from "../../../common/validator-functions/isFieldEmpty";
import { BASE_URL } from "../../../common/constans";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdvSnackbar from "../../../common/adv-snackbar";
import { FieldArray } from "react-final-form-arrays";
import { jwtDecode } from "jwt-decode";

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
  const [imageSrcs, setImageSrcs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const SNACK_DURATION = 4000;

  const openSnack = ({ severity, text }) => {
    setSeverity(severity);
    setText(text);
    setOpen(true);
  };

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
    if (!token) {
      navigate("/forbidden");
      return;
    }
    var user = jwtDecode(token);
    const unixTimestamp = user.exp * 1000;
    const date = new Date(unixTimestamp);
    const currentDate = new Date();
    if (date < currentDate) {
      navigate("/session-expired");
    }
    if (user.userType !== "TM") {
      navigate("/forbidden");
    }

    fetch(BASE_URL + "/team/getAllMemberTeams?token=" + token, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTeams(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleRemoveImage = (index) => {
    const newImageSrcs = [...imageSrcs];
    newImageSrcs.splice(index, 1);
    setImageSrcs(newImageSrcs);
  };

  const handleImageChange = (event, index) => {
    const files = event.target.files;
    const newImageSrcs = [...imageSrcs];

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageSrcs[index] = e.target.result;
        setImageSrcs(newImageSrcs);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <Stack direction={"row"}>
      <LeftDrawer
        drawerItems={TeamMemberDrawerItems}
        adaptWidth={1071}
      ></LeftDrawer>
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
            setLoading(true);
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

            console.log(values);
            setTimeout(() => {
              setLoading(false);
            }, 1000);

            // let formData = new FormData();
            // const fileExtension = imageSrc.split(";")[0].split("/")[1];
            // const blob = base64ToBlob(imageSrc, `image/${fileExtension}`);
            // const file = new File([blob], `image.${fileExtension}`, {
            //   type: `image/${fileExtension}`,
            // });
            // formData.append("file", file);
            // fetch(
            //   BASE_URL +
            //     `/imageanalysisreport/create?token=${localStorage.getItem(
            //       "userToken"
            //     )}&createdAt=${formattedCurrentDate}&title=${
            //       values.reportTitle
            //     }&teamId=${values.team}&category=${values.adCategory}`,
            //   {
            //     method: "POST",
            //     body: formData,
            //   }
            // )
            //   .then((response) => {
            //     if (response.ok) {
            //       openSnack({
            //         severity: "success",
            //         text: "Image is analyzed successfully.",
            //       });
            //       navigate("/team-member");
            //       return undefined;
            //     } else return response.text();
            //   })
            //   .then((result) => {
            //     if (result) {
            //       openSnack({ severity: "error", text: result });
            //     }
            //   })
            //   .catch((error) => console.error(error));
          }}
          initialValues={{ adCategory: "Political", imageSrcs: [""] }}
          mutators={{ ...arrayMutators }}
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
                      <FieldArray name="imageSrcs">
                        {({ fields }) => (
                          <Stack direction={"column"} gap={"12px"}>
                            {fields.map((element, index) => (
                              <Field
                                name={element}
                                key={index}
                                validate={(value) => {
                                  return imageSrcs[index]
                                    ? undefined
                                    : "Image must be uploaded.";
                                }}
                              >
                                {({ input: { onChange, ...input }, meta }) => (
                                  <Box
                                    display={"flex"}
                                    alignSelf={"stretch"}
                                    flexDirection={"column"}
                                    gap={"4px"}
                                  >
                                    <Typography>
                                      Image of Advertisement{" "}
                                      {fields.length
                                        ? fields.length < 2
                                          ? ""
                                          : index + 1
                                        : ""}
                                    </Typography>
                                    <Box
                                      display={"flex"}
                                      flexDirection={"row"}
                                      alignSelf={"stretch"}
                                      gap={"4px"}
                                    >
                                      <label htmlFor={`file-input-${index}`}>
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
                                          {imageSrcs[index] ? (
                                            <img
                                              src={imageSrcs[index]}
                                              alt={`Uploaded ${index}`}
                                              style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "cover",
                                              }}
                                            />
                                          ) : (
                                            <AddPhotoAlternateRoundedIcon
                                              style={{
                                                fontSize: "100px",
                                                color: "gray",
                                              }}
                                            />
                                          )}
                                          <input
                                            {...input}
                                            type="file"
                                            id={`file-input-${index}`}
                                            style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={(event) =>
                                              handleImageChange(event, index)
                                            }
                                          />
                                          {meta.touched && meta.error
                                            ? meta.error
                                            : ""}
                                        </Box>
                                      </label>
                                      <Collapse
                                        orientation="horizontal"
                                        in={
                                          fields.length
                                            ? !(fields.length < 2)
                                            : false
                                        }
                                      >
                                        {" "}
                                        <Button
                                          disabled={
                                            fields.length
                                              ? fields.length < 2
                                              : true
                                          }
                                          type="button"
                                          sx={{
                                            maxWidth: "32px",
                                            minWidth: "0",
                                            flexGrow: "0",
                                            width: "32px",
                                            height: "32px",
                                          }}
                                          onClick={() => {
                                            fields.remove(index);
                                            handleRemoveImage(index);
                                          }}
                                        >
                                          <CloseRoundedIcon></CloseRoundedIcon>
                                        </Button>
                                      </Collapse>
                                    </Box>
                                  </Box>
                                )}
                              </Field>
                            ))}
                            <Button
                              variant="outlined"
                              disableElevation
                              size="small"
                              type="button"
                              onClick={() => {
                                fields.push("");
                              }}
                              disabled={
                                fields.length ? fields.length > 2 : true
                              }
                              sx={{
                                width: "fit-content",
                                alignSelf: "flex-end",
                              }}
                            >
                              Add another ad
                            </Button>
                          </Stack>
                        )}
                      </FieldArray>
                    </Stack>
                    <Button
                      variant="contained"
                      disableElevation
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress
                          style={{ height: "24.5px", width: "24.5px" }}
                          color="inherit"
                        ></CircularProgress>
                      ) : (
                        "Analyze"
                      )}
                    </Button>
                  </Stack>
                </Paper>
              </Stack>
            </form>
          )}
        ></Form>
      </Stack>
      <AdvSnackbar
        open={open}
        setOpen={setOpen}
        severity={severity}
        duration={SNACK_DURATION}
        text={text}
      ></AdvSnackbar>
    </Stack>
  );
};
