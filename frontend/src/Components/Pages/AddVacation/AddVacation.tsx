import Vacation from "../../Models/Vacation";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addVacationAction } from "../../Redux/VacationReducer";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import VacationForm from "../VacationForm/VacationForm";
import moment from "moment";

function AddVacation(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewVacation = (newVacation: Vacation) => {
    const vac = new FormData();
    vac.append("destination", newVacation.destination);
    vac.append("description", newVacation.description);
    vac.append("startDate", newVacation.startDate.toString());
    vac.append("endDate", newVacation.endDate.toString());
    vac.append("price", newVacation.price.toString());
    vac.append("image", (newVacation.image as unknown as FileList).item(0));
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/vacations/addVacation`,
        vac
      )
      .then((response) => {
        const addedVacation = response.data;
        const changedVac = {
          ...addedVacation,
          price: parseInt(addedVacation.price),
        };
        dispatch(addVacationAction(changedVac));
        navigate("/");
      });
  };

  const today: string = moment().format("YYYY-MM-DD");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Vacation
        </Typography>
        <VacationForm addNewVacation={addNewVacation} minStartDate={today} />
      </Box>
    </Container>
  );
}
export default AddVacation;
