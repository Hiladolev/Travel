import "./Admin.css";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "../../Models/Pagination";
import { RootState } from "../../Redux/TravelApp";
import SingleVacAdmin from "./SingleVacAdmin/SingleVacAdmin";
import { sortBy } from "lodash";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import MainFeaturedPost from "../Theme/MainFeaturedPost";

function Admin(): JSX.Element {
  const mainFeaturedPost = {
    title: "Paradise Seekers",
    description:
      "Escape to a world of breathtaking beauty and unforgettable adventures with our exclusive vacation experiences.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageText: "main image description",
    linkText: "Continue reading…",
  };
  const defaultTheme = createTheme();
  const allVacations = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  const sorted = sortBy(allVacations, "startDate");
  const vacationsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Get current vacations
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = sorted.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  // Change page ---------currentVacations(array)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const editVacation = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    // <div className="Admin">
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <MainFeaturedPost post={mainFeaturedPost} />
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {currentVacations.map((item) => (
            <SingleVacAdmin
              key={item.id}
              destination={item.destination}
              description={item.description}
              startDate={item.startDate}
              endDate={item.endDate}
              price={item.price}
              image={item.image}
              id={item.id}
              edit={() => editVacation(item.id)}
            />
          ))}
        </Grid>
      </Box>
      <Pagination
        vacationsPerPage={vacationsPerPage}
        totalVacations={allVacations.length}
        paginate={paginate}
      />
      {/* // </div> */}
    </ThemeProvider>
  );
}

export default Admin;
