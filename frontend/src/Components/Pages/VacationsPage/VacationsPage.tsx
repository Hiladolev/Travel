import AllVacations from "../AllVacations/AllVacations";
import MainFeaturedPost from "../Theme/MainFeaturedPost";

const mainFeaturedPost = {
  title: "Explore your next offer",
  description:
    "Find resorts, accommodations, and a wealth of travel options...",
  image:
    "https://cdn.pixabay.com/photo/2018/03/15/10/40/panoramic-3227796_1280.jpg",
  imageText: "main image description",
  linkText: "For more adventures...",
};

function VacationsPage(): JSX.Element {
  return (
    <>
      <MainFeaturedPost post={mainFeaturedPost} />
      <AllVacations />
    </>
  );
}

export default VacationsPage;
