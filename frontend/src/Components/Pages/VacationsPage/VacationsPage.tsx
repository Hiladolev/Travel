import { ThemeProvider, createTheme } from "@mui/material";
import AllVacations from "../AllVacations/AllVacations";
import MainFeaturedPost from "../Theme/MainFeaturedPost";

const mainFeaturedPost = {
  title: "Paradise Seekers",
  description:
    "Escape to a world of breathtaking beauty and unforgettable adventures with our exclusive vacation experiences.",
  image:
    "https://cdn.pixabay.com/photo/2018/03/15/10/40/panoramic-3227796_1280.jpg",
  imageText: "main image description",
  linkText: "For more adventures...",
};
const defaultTheme = createTheme();

function VacationsPage(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MainFeaturedPost post={mainFeaturedPost} />
      <AllVacations />
    </ThemeProvider>
  );
}

export default VacationsPage;
