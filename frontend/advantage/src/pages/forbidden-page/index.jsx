import { Stack, Box, Typography, Link } from "@mui/material";

export const ForbiddenPage = () => {
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
          src="https://imgur.com/flHudHE.png"
          alt="Lost in the Wind"
          style={{ maxWidth: "400px", height: "auto" }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{ color: "black", fontWeight: 700, fontFamily: "monospace" }}
      >
        403: You don't have keys for this page
      </Typography>
      <Typography variant="h6" sx={{ color: "black", fontFamily: "monospace" }}>
        The page you are looking for is forbidden for your account type.
      </Typography>
      <Link
        href="/"
        variant="h6"
        underline="none"
        sx={{ display: "block", mt: 2, fontWeight: 700, color: "#1733d1" }}
      >
        {"Return home"}
      </Link>
    </Stack>
  );
};
