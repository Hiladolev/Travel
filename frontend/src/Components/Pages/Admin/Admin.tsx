import "./Admin.css";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "../../Models/Pagination";
import { RootState } from "../../Redux/TravelApp";
import SingleVacAdmin from "./SingleVacAdmin/SingleVacAdmin";
import { sortBy } from "lodash";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Admin(): JSX.Element {
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
    <div className="Admin">
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
    </div>
  );
}

export default Admin;
