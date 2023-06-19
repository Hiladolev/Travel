import { useEffect, useState } from "react";
import "./AllVacations.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "../../Models/Pagination";
import { RootState, travel } from "../../Redux/TravelApp";
import Vacation from "../../Models/Vacation";
import moment from "moment";
import { Button, ButtonGroup } from "@mui/material";
import SingleVac from "./SingleItem/SingleVac";
import { sortBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { downloadVacationsAction } from "../../Redux/VacationReducer";
import axios from "axios";

function AllVacations(): JSX.Element {
  const dispatch = useDispatch();
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
  const allVacations: Vacation[] = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  const sorted = sortBy(allVacations, "startDate");
  const vacationsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [vacationsArray, setVacationsArray] = useState<Vacation[]>(sorted);

  //Future Vacations
  const futureVacationsFilter = sorted.filter((vacation: Vacation) => {
    const stringToDate = new Date(vacation.startDate);
    const formatDate = moment(stringToDate, "DD/MM/YYYY");
    return formatDate.isAfter(moment());
  });
  //Active Vacations
  const activeVacationsFilter = sorted.filter((vacation: Vacation) => {
    const startDate = new Date(vacation.startDate);
    const endDate = new Date(vacation.endDate);
    const formatStartDate = moment(startDate, "DD/MM/YYYY");
    const formatEndDate = moment(endDate, "DD/MM/YYYY");
    return moment().isBetween(formatStartDate, formatEndDate);
  });
  // Get current vacations=>Pagination
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacationsArray.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );
  const handleFutureVacations = () => {
    setVacationsArray(futureVacationsFilter);
  };
  const handleActiveVacations = () => {
    setVacationsArray(activeVacationsFilter);
  };
  const handleAllVacations = () => {
    setVacationsArray(sorted);
  };

  // Change page ---------currentVacations(array)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const handleLikesClick = (id: number) => {};

  return (
    <div className="AllVacations">
      <Box sx={{ width: "100%" }}>
        <ButtonGroup>
          <Button
            size="small"
            style={{
              position: "absolute",
              top: 430,
              left: 10,
              background: "white",
            }}
            onClick={handleFutureVacations}
          >
            Future Vacations
          </Button>
          <Button
            size="small"
            style={{
              position: "absolute",
              top: 430,
              left: 180,
              background: "white",
            }}
            onClick={handleActiveVacations}
          >
            Active
          </Button>
          <Button
            size="small"
            style={{
              position: "absolute",
              top: 430,
              left: 260,
              background: "white",
            }}
            onClick={handleAllVacations}
          >
            All Vacations
          </Button>
        </ButtonGroup>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {currentVacations.map((item) => (
            <SingleVac
              value={0}
              key={item.id}
              destination={item.destination}
              description={item.description}
              startDate={item.startDate}
              endDate={item.endDate}
              price={item.price}
              image={item.image}
              id={item.id}
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
