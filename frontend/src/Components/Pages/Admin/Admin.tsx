import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "../../Models/Pagination";
import { RootState, travel } from "../../Redux/TravelApp";
import SingleVacAdmin from "./SingleVacAdmin/SingleVacAdmin";
import { sortBy } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import MainFeaturedPost from "../Theme/MainFeaturedPost";
import axios from "axios";
import { downloadVacationsAction } from "../../Redux/VacationReducer";

function Admin(): JSX.Element {
  const dispatch = useDispatch();
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

  const fetchVacations = () => {
    console.log("getting vacations from backend....");
    axios
      .get("http://localhost:4000/api/v1/vacations/allVacations")
      .then((response) => {
        dispatch(downloadVacationsAction(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  useEffect(() => {
    if (travel.getState().vacations.allVacations.length < 1) {
      fetchVacations();
    }
  }, []);
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
