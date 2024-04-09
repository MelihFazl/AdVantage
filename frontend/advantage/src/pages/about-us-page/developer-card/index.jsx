import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function DeveloperCard({ name, title, image }) {
  return (
    <Card
      sx={{
        maxWidth: 260,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{
          marginTop: "16px",
          width: 160,
          height: 160,
          borderRadius: "50%", // Make the image round
        }}
        image={image}
        title={name}
        component={"img"}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          color={"#0AD1BF"}
          fontWeight={"bold"}
        >
          {name}
        </Typography>
        <Typography variant="body2">{title}</Typography>
      </CardContent>
    </Card>
  );
}
