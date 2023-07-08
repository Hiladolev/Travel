import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Box>
  );
}
