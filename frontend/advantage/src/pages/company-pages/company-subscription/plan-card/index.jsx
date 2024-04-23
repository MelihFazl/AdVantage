import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Typography, CardActionArea, Switch } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/material";

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

export default function PlanCard({ plan, onGetStartedButtonClick }) {
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
        borderRadius: "8px",
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
          <BoxTitle>Freelancer</BoxTitle>
          <Typography>{`Plan details:`}</Typography>
          <Typography>{`-This`}</Typography>
          <Typography>{`-This`}</Typography>
          <Typography>{`-That`}</Typography>

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
              <MoneyTitle>100$</MoneyTitle>
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
              <MoneyTitle>10$</MoneyTitle>
              <BoxTitleNormal>/per month</BoxTitleNormal>
            </Box>
          )}
          <Button
            disableElevation
            variant="contained"
            color="warning"
            sx={{ borderRadius: "12px" }}
          >
            Get Started
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
