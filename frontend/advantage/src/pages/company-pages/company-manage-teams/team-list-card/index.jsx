import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function TeamListCard({
  team,
  onTeamCardClick,
  onEditClick,
  onAddClick,
  onDeleteClick,
}) {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 300, height: 80, borderRadius: "8px" }}
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
              sx={{ flexShrink: 0 }}
            >
              <Typography sx={{ fontSize: 16 }} gutterBottom>
                {team.teamName}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: 14,
                }}
                gutterBottom
              >
                {`Usage: ${team.monthlyAnalysisUsage}/${team.usageLimit}`}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              padding={"0 20px 0 20px"}
              gap={"8px"}
              sx={{ flexShrink: 0 }} // Prevent shrinking
            >
              <Button
                variant="outlined"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddClick(team);
                }}
                disableElevation
              >
                Add Member
              </Button>
              <Button
                variant="outlined"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(team);
                }}
                disableElevation
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(team);
                }}
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
