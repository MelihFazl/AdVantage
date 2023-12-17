import LeftDrawer from "../../../common/left-drawer";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
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
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import useMediaQuery from "@mui/material/useMediaQuery";
import { isFieldEmpty } from "../../../common/validator-functions/isFieldEmpty";
import { BASE_URL } from "../../../common/constans";
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

export const TeamMemberTextualAnalysisPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const matches = useMediaQuery("(min-width:897px)");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      BASE_URL + "/user/teamMember?userID=" + localStorage.getItem("userId"),
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setUser(JSON.parse(result)[0]);
      })
      .catch((error) => console.log("error", error));
  }, []);

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
          <TeamText>Analyze text based advertisements</TeamText>
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
            if (values.adContents.length === 1) {
              var requestOptions = {
                method: "POST",
                redirect: "follow",
              };

              fetch(
                BASE_URL +
                  `/singleanalysisreport/create?category=${values.adCategory}&uploaderId=${user.id}&createdAt=${formattedCurrentDate}&adText=${values.adContents[0]}&title=${values.reportTitle}`,
                requestOptions
              )
                .then((response) => response.text())
                .then((result) => {
                  navigate("/team-member");
                })
                .catch((error) => console.log("error", error));
            } else if (values.adContents.length > 1) {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                adRequests: values.adContents,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(
                BASE_URL +
                  `/multipleanalysisreport/create?category=${values.adCategory}&uploaderId=${user.id}&createdAt=${formattedCurrentDate}&title=${values.reportTitle}`,
                requestOptions
              )
                .then((response) => response.text())
                .then((result) => {
                  navigate("/team-member");
                })
                .catch((error) => console.log("error", error));
            } else {
              console.log("empyt");
            }
          }}
          initialValues={{ adCategory: "Political", adContents: [""] }}
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
                  }}
                >
                  <FieldArray name="adContents">
                    {({ fields }) => (
                      <Stack direction={"column"} gap={"12px"}>
                        {fields.map((element, index) => (
                          <Field
                            name={element}
                            key={index}
                            validate={isFieldEmpty(
                              "Ad content must be entered."
                            )}
                          >
                            {({ input, meta }) => (
                              <Box
                                display={"flex"}
                                alignSelf={"stretch"}
                                flexDirection={"column"}
                                gap={"4px"}
                              >
                                <Typography>
                                  Content of Advertisement{" "}
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
                                  {" "}
                                  <TextField
                                    {...input}
                                    error={
                                      meta.touched && meta.error ? true : false
                                    }
                                    helperText={
                                      meta.touched && meta.error
                                        ? meta.error
                                        : ""
                                    }
                                    variant="outlined"
                                    size="small"
                                    sx={{ flexGrow: 1 }}
                                    multiline
                                    rows={4}
                                  />
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
                                        fields.length ? fields.length < 2 : true
                                      }
                                      type="button"
                                      sx={{
                                        maxWidth: "32px",
                                        minWidth: "0",
                                        flexGrow: "0",
                                        width: "32px",
                                        height: "32px",
                                      }}
                                      onClick={() => fields.remove(index)}
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
                          sx={{
                            width: "fit-content",
                            alignSelf: "flex-end",
                          }}
                        >
                          Add another ad
                        </Button>
                        <Button
                          variant="contained"
                          disableElevation
                          type="submit"
                        >
                          Analyze
                        </Button>
                      </Stack>
                    )}
                  </FieldArray>
                </Paper>
              </Stack>
            </form>
          )}
        ></Form>
      </Stack>
    </Stack>
  );
};
