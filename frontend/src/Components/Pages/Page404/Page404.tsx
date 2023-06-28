import { Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

// Animation keyframes
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Styled components
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  animation: ${fadeIn} 1s ease-in;
`;

const OopsText = styled(Typography)`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ErrorText = styled(Typography)`
  font-size: 24px;
  margin-bottom: 40px;
`;

const ImageContainer = styled("div")`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
`;

const Image = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export default function Page404(): JSX.Element {
  return (
    <Container>
      <OopsText variant="h1">Oops!Page Not Found</OopsText>
      <ErrorText variant="h2">I'm on a vacation🤪</ErrorText>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2016/11/29/07/16/beach-1868047_1280.jpg"
          alt="Cool Image"
        />
      </ImageContainer>
      <br />
      <Button variant="contained" color="primary" href="/">
        Go Back to Home
      </Button>
    </Container>
  );
}
