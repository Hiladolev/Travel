import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { updateVacationAction } from "../../Redux/VacationReducer";
import axios from "axios";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import VacationForm from "../VacationForm/VacationForm";

type updateVac = {
  destination: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  price: number;
  image?: string;
  id?: number;
};
function EditVacation(): JSX.Element {
  const loaderData = useLoaderData() as updateVac;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const formatDate = (date: string | Date): string => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const editNewVacation = (updatedVacation: updateVac) => {
    const formControl: FormData = new FormData();
    formControl.append("destination", updatedVacation.destination);
    formControl.append("description", updatedVacation.description);
    formControl.append("startDate", updatedVacation.startDate.toString());
    formControl.append("endDate", updatedVacation.endDate.toString());
    formControl.append("price", updatedVacation.price.toString());
    formControl.append("id", params.id.toString());
    formControl.append(
      "image",
      typeof updatedVacation.image === "string"
        ? undefined
        : (updatedVacation.image as unknown as FileList)?.item(0)
    );
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/v1/vacations/edit`,
        formControl
      )
      .then((response) => {
        const finalVacation = response.data;
        if (!finalVacation.image) {
          finalVacation.image = loaderData.image;
        }
        const changedVac = {
          ...finalVacation,
          price: parseInt(finalVacation.price),
          id: parseInt(params.id),
        };
        dispatch(updateVacationAction(changedVac));
        navigate("/");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Vacation
        </Typography>
        <VacationForm
          vacationActionFunction={editNewVacation}
          defaultValues={{
            destination: loaderData.destination,
            description: loaderData.description,
            startDate: formatDate(loaderData.startDate),
            endDate: formatDate(loaderData.endDate),
            price: loaderData.price,
            image: `${process.env.REACT_APP_API_URL}/images/${loaderData.image}`,
          }}
        />
      </Box>
    </Container>
  );
}

export default EditVacation;
