import { useEffect, useState } from "react";
import "./AllVacations.css";
import SingleVac from "../AllVacations/SingleItem/SingleVac";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "../../Models/Pagination";
import axios from "axios";
import { travel } from "../../Redux/TravelApp";
import { downloadVacationsAction } from "../../Redux/VacationReducer";

function AllVacations(): JSX.Element {
  const [vacationsPerPage, setVacationsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  // const [likes, setLikes] = useState(0);
  // const [active, setActive] = useState(false);

  useEffect(() => {
    if (travel.getState().vacations.allVacations.length < 1) {
      console.log("getting data from backend....");
      axios
        .get("http://localhost:4000/api/v1/images/allVacations")
        .then((response) => {
          travel.dispatch(downloadVacationsAction(response.data));

          setRefresh(!refresh);
        });
    }
  }, []);

  // Get current vacations
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = travel
    .getState()
    .vacations.allVacations.slice(indexOfFirstVacation, indexOfLastVacation);

  // Change page ---------currentVacations(array)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="AllVacations">
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {currentVacations.map((item) => (
            <SingleVac
              // value={likes}
              key={item.id}
              destination={item.destination}
              description={item.description}
              startDate={item.startDate}
              endDate={item.endDate}
              price={item.price}
              image={item.image}
              // onClick={() => setLikes(likes + 1)}
            />
          ))}
        </Grid>
      </Box>
      <Pagination
        vacationsPerPage={vacationsPerPage}
        totalVacations={travel.getState().vacations.allVacations.length}
        paginate={paginate}
      />
    </div>
  );
}

export default AllVacations;
