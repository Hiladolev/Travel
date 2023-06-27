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
import { downloadFollowers } from "../../Redux/FollowerReducer";
import Follower from "../../Models/Follower";
import { useNavigate } from "react-router-dom";

enum ActiveFilterType {
  all = "all",
  future = "future",
  active = "active",
  followed = "followed",
}

function AllVacations(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const allVacations: Vacation[] = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  const allFollowers: Follower[] = useSelector(
    (state: RootState) => state.followers.allFollowers
  );
  const sorted = sortBy(allVacations, "startDate");
  const vacationsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [vacationsArray, setVacationsArray] = useState<Vacation[]>(sorted);
  const [activeFilter, setActiveFilter] = useState<ActiveFilterType>(
    ActiveFilterType.all
  );

  const fetchVacations = () => {
    console.log("getting vacations from backend....");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/vacations/allVacations`)
      .then((response) => {
        dispatch(downloadVacationsAction(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  const getFollowers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/followers/allFollowers`)
      .then((response) => {
        dispatch(downloadFollowers(response.data));
      });
  };
  useEffect(() => {
    if (allVacations.length < 1) {
      fetchVacations();
    }
  }, []);
  useEffect(() => {
    if (allFollowers.length < 1) {
      getFollowers();
    }
  }, []);
  useEffect(() => {
    // setVacationsArray(sorted);
    switch (activeFilter) {
      case ActiveFilterType.all:
        setVacationsArray(sorted);
        break;
      case ActiveFilterType.future:
        setVacationsArray(futureVacationsFilter);
        break;
      case ActiveFilterType.active:
        setVacationsArray(activeVacationsFilter);
        break;
      case ActiveFilterType.followed:
        setVacationsArray(followedVacations);
    }
  }, [allVacations.length, activeFilter]);

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

  const currentUserFollow = allFollowers.filter(
    (follower) => follower.userId === currentUser.id
  );
  const followedVacations = currentUserFollow.map((item) => {
    return sorted.find((vacation) => vacation.id === item.vacationId);
  });

  // Get current vacations=>Pagination
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacationsArray.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );
  const handleFutureVacations = () => {
    setActiveFilter(ActiveFilterType.future);
  };
  const handleActiveVacations = () => {
    setActiveFilter(ActiveFilterType.active);
  };
  const handleAllVacations = () => {
    setActiveFilter(ActiveFilterType.all);
  };
  const handleFollowedVacations = () => {
    setActiveFilter(ActiveFilterType.followed);
  };

  // Change page ---------currentVacations(array)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const editVacation = (id: number) => {
    navigate(`/edit/${id}`);
  };
  return (
    <div className="AllVacations">
      <Box sx={{ width: "100%" }}>
        <ButtonGroup>
          <Button
            size="small"
            variant="contained"
            style={{
              position: "absolute",
              top: 350,
              left: 10,
            }}
            onClick={handleFutureVacations}
          >
            Future Vacations
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{
              position: "absolute",
              top: 350,
              left: 180,
            }}
            onClick={handleActiveVacations}
          >
            Active
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{
              position: "absolute",
              top: 350,
              left: 260,
            }}
            onClick={handleAllVacations}
          >
            All Vacations
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{
              position: "absolute",
              top: 350,
              left: 400,
            }}
            onClick={handleFollowedVacations}
          >
            Followed
          </Button>
        </ButtonGroup>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {currentVacations.map((item) => (
            <SingleVac
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
        totalVacations={travel.getState().vacations.allVacations.length}
        paginate={paginate}
      />
    </div>
  );
}

export default AllVacations;
