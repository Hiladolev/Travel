import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Header_MUI(): JSX.Element {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${"https://cdn.pixabay.com/photo/2021/08/02/16/22/beach-6517214_1280.jpg"})`,
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="white"
            gutterBottom
          >
            Escape to a world of breathtaking beauty and unforgettable
            adventures with our exclusive vacation experiences.{" "}
          </Typography>
          {/* <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Escape to a world of breathtaking beauty and unforgettable
            adventures with our exclusive vacation experiences.
          </Typography> */}
        </Container>
      </Box>
    </div>
  );
}

export default Header_MUI;
