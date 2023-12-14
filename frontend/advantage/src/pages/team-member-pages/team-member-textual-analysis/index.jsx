import LeftDrawer from "../../../common/left-drawer";
import React from "react";
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
  const matches = useMediaQuery("(min-width:897px)");

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
            console.log(values);
          }}
          initialValues={{ adCategory: "political", adContents: [""] }}
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
                            <MenuItem value={"political"}>Political</MenuItem>
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
