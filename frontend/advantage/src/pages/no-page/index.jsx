import { Stack, Box, Typography, Link } from "@mui/material";

export const NoPage = () => {
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
      <Box width={"400px"}>
        <img
          src="https://imgur.com/oCkEbrA.png"
          alt="Lost in the Wind"
          style={{ maxWidth: "400px", height: "auto" }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{ color: "black", fontWeight: 700, fontFamily: "monospace" }}
      >
        404: This Page is Lost in the Wind
      </Typography>
      <Typography variant="h6" sx={{ color: "black", fontFamily: "monospace" }}>
        The page you are looking for is not available on our website.
      </Typography>
      <Link
        href="/"
        variant="h6"
        underline="none"
        sx={{ display: "block", mt: 2, fontWeight: 700, color: "white" }}
      >
        {"Return home"}
      </Link>
    </Stack>
  );
};
