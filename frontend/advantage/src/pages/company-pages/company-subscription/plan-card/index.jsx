import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography, CardActionArea, Switch } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/material";
import { BASE_URL } from "../../../../common/constans";

const BoxTitle = styled(Typography)({
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "28px",
  color: "#000000",
  marginBottom: "20px",
});

const BoxTitleNormal = styled(Typography)({
  fontSize: "22px",
  color: "#000000",
});

const MoneyTitle = styled(Typography)({
  fontWeight: "bold", // Added fontWeight: 'bold'
  fontSize: "40px",
  color: "#000000",
});

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: "#FFA500",
    "&.Mui-checked": {
      color: "#FFA500", // Orange color for the toggle when checked
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#CCC", // Grey color for the track when checked
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#CCC", // Grey color for the track when unchecked
  },
}));

export default function PlanCard({ company, plan, openSnack }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 360,
        maxHeight: 450,
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <Box
          height="100%"
          width="100%"
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
        >
          <BoxTitle>{plan[0].paymentPlanType}</BoxTitle>
          <Typography>{`Plan details:`}</Typography>
          <Typography>{`-${
            checked ? plan[1].paymentPeriodType : plan[0].paymentPeriodType
          } usable cretids: ${
            checked ? plan[1].usageLimit : plan[0].usageLimit
          }`}</Typography>

          <FormControlLabel
            control={<CustomSwitch checked={checked} onChange={handleChange} />}
            labelPlacement="top"
            label={checked ? "Annually" : "Monthly"}
            style={{ color: "black", marginTop: "20px", marginBottom: "20px" }}
          />

          {checked ? (
            <Box
              display="flex"
              flexDirection={"row"}
              gap={"4px"}
              alignItems={"center"}
              marginBottom={"10px"}
            >
              <MoneyTitle>{`${plan[1].price}$`}</MoneyTitle>
              <BoxTitleNormal>/per year</BoxTitleNormal>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection={"row"}
              gap={"4px"}
              alignItems={"center"}
              marginBottom={"10px"}
            >
              <MoneyTitle>{`${plan[0].price}$`}</MoneyTitle>
              <BoxTitleNormal>/per month</BoxTitleNormal>
            </Box>
          )}
          {company.subscription.paymentPlanType === plan[0].paymentPlanType &&
          (checked
            ? company.subscription.paymentPeriodType ===
              plan[1].paymentPeriodType
            : company.subscription.paymentPeriodType ===
              plan[0].paymentPeriodType) ? (
            <Typography>You are on this plan</Typography>
          ) : (
            <Button
              disableElevation
              variant="contained"
              color="warning"
              onClick={() => {
                var token = localStorage.getItem("userToken");
                const requestOptions = {
                  method: "POST",
                  redirect: "follow",
                };
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
                fetch(
                  BASE_URL +
                    "/company/updateSubscription?token=" +
                    token +
                    "&paymentPlanType=" +
                    plan[0].paymentPlanType +
                    "&paymentPeriodType=" +
                    (checked
                      ? plan[1].paymentPeriodType
                      : plan[0].paymentPeriodType) +
                    "&createdAt=" +
                    formattedCurrentDate,
                  requestOptions
                )
                  .then((response) => {
                    if (response.ok) {
                      window.location.reload();
                      openSnack({
                        severity: "success",
                        text: "Subscription plan has changed successfully.",
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
              }}
              sx={{ borderRadius: "12px" }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
