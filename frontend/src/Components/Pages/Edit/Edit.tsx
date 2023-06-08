import { useNavigate } from "react-router-dom";
import "./Edit.css";
import { useForm } from "react-hook-form";
import { travel } from "../../Redux/TravelApp";
import Vacation from "../../Models/Vacation";
import { updateVacationAction } from "../../Redux/VacationReducer";
import axios from "axios";
import { Button, TextField } from "@mui/material";

function Edit(): JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vacation>();

  const editNewVacation = (newVacation: Vacation) => {
    travel.dispatch(updateVacationAction(newVacation));
    axios
      .post("http://localhost:4000/api/v1/vacations/edit", newVacation)
      .then((response) => navigate("/"));
  };

  return (
    <div className="Edit">
      <h2>Edit Vacation</h2>
      <form onSubmit={handleSubmit(editNewVacation)}>
        <TextField
          label="Destination"
          variant="outlined"
          required
          {...register("destination")}
        />
        <br /> <br />
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={2}
          label="Description"
          required
          {...register("description")}
        />
        <br /> <br />
        <input required type="date" {...register("startDate")} />
        <br /> <br />
        <input type="date" {...register("endDate")} />
        <br /> <br />
        <TextField
          label="Price"
          type="number"
          placeholder="$"
          required
          {...register("price", { valueAsNumber: true, min: 0, max: 10000 })}
        />
        {errors.price && (
          <div style={{ color: "red" }}>Limit Price is $10,000</div>
        )}
        <br /> <br />
        <TextField
          label="Image"
          variant="outlined"
          required
          {...register("image")}
        />
        <br />
        <br />
        <Button type="submit">Add Vacation</Button>
      </form>
    </div>
  );
}

export default Edit;
