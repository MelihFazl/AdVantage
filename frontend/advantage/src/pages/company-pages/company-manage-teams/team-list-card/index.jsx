import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function TeamListCard({ team, onTeamCardClick }) {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 263.2, height: 80, borderRadius: "8px" }}
    >
      <CardActionArea
        onClick={() => {
          onTeamCardClick(team);
        }}
      >
        <CardContent>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"%100"}
            gap={"3px"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              padding={"0 20px 0 20px"}
            >
              <Typography sx={{ fontSize: 16 }} gutterBottom>
                Team Name
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 14 }}
                gutterBottom
              >
                Usage: 1234/5000
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              padding={"0 20px 0 20px"}
              gap={"8px"}
            >
              <Button variant="outlined" disableElevation>
                Edit
              </Button>
              <Button
                variant="outlined"
                style={{ borderColor: "#F44336", color: "#F44336" }}
                disableElevation
              >
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
