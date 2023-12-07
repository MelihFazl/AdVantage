import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ReportListCard() {
  return (
    <Card sx={{ minWidth: 263.2, maxWidth: 540, height: 230 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Title of Ad
        </Typography>
        <Typography variant="body2">Uploaded by: Name Surname</Typography>
        <Box
          height={"120px"}
          text-overflow="ellipsis"
          white-space="nowrap"
          overflow="hidden"
        >
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            <Typography variant="body2" color={"#000"}>
              Content:
            </Typography>
            {
              "REAL SLIM SHADY PLEASE STAND UP THIS LOOK LIKE A JOB FOR ME BUT EVERYBODU JUST FOLLOW ME BECAUSE WE NEED A LITTLE CONTROVERSY FEEL SO EMPTY WITHOUT ME CANT BE YOUR SUPERMAN"
            }
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Category:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Political
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
