import { Stack, Box, Typography, Link } from "@mui/material";

export const ExpiredPage = () => {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      backgroundColor="#b6e7fc"
    >
      <Typography
        variant="h3"
        noWrap
        component="a"
        sx={{
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        AdVantage
      </Typography>
      <Box width={"400px"} marginTop="10px" marginBottom="10px">
        <img
          src="https://imgur.com/g3hgqe8.png"
          alt="Lost in the Wind"
          style={{ maxWidth: "400px", height: "auto" }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{ color: "black", fontWeight: 700, fontFamily: "monospace" }}
      >
        Your session is expired.
      </Typography>
      <Typography variant="h6" sx={{ color: "black", fontFamily: "monospace" }}>
        Please login again.
      </Typography>
      <Link
        href="/login"
        variant="h6"
        underline="none"
        sx={{ display: "block", mt: 2, fontWeight: 700, color: "white" }}
      >
        {"Login page"}
      </Link>
    </Stack>
  );
};
