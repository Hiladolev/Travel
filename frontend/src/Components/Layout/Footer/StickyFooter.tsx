import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="primary.contrastText"
      fontFamily={["Roboto", "Helvetica", "Arial", "sans-serif"]}
    >
      Made with <FavoriteIcon sx={{ color: pink[500] }} /> By &nbsp;
      <Link color="primary.contrastText" href="https://github.com/Hiladolev">
        Hila Dolev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          bgcolor: "info.main",
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
