import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  // background: 'url("your-background-image-url") no-repeat fixed',
  backgroundSize: "cover",
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const HomePage = () => {
  return (
    <StyledContainer>
      <Title variant="h4">Hello, guest!</Title>
      <Typography variant="body1" align="center">
        Please sign in or register to access the site:
      </Typography>
      <br />
      <StyledButton
        variant="contained"
        color="primary"
        href="/login"
        size="large"
      >
        Sign In
      </StyledButton>
      <StyledButton
        variant="contained"
        color="secondary"
        href="/register"
        size="large"
      >
        Register
      </StyledButton>
    </StyledContainer>
  );
};

export default HomePage;
