import Vacation from "../../Models/Vacation";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/TravelApp";
import axios from "axios";
import { addVacationAction } from "../../Redux/VacationReducer";
import FormData from "form-data";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

function AddVacation(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allVacations = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<undefined | string>();
  const today: string = moment().format("YYYY-MM-DD");
  const [minStartDate, setMinStartDate] = useState<string>(today);

  const onChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = moment(event.target.value).format("YYYY-MM-DD");
    setMinStartDate(selectedDate);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vacation>();

  const addNewVacation = (newVacation: Vacation) => {
    const vac = new FormData();
    vac.append("destination", newVacation.destination);
    vac.append("description", newVacation.description);
    vac.append("startDate", newVacation.startDate.toString());
    vac.append("endDate", newVacation.endDate.toString());
    vac.append("price", newVacation.price.toString());
    vac.append("image", (newVacation.image as unknown as FileList).item(0));
    axios
      .post("http://localhost:4000/api/v1/vacations/addVacation", vac)
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

  return (
    <div className="Add">
      <Typography variant="h4" gutterBottom>
        Add Vacation
      </Typography>

      <form onSubmit={handleSubmit(addNewVacation)}>
        <TextField
          sx={{
            width: 300,
          }}
          label="Destination"
          variant="outlined"
          required
          {...register("destination")}
        />
        <br /> <br />
        <TextField
          sx={{
            width: 300,
          }}
          id="outlined-multiline-static"
          multiline
          rows={2}
          label="Description"
          required
          {...register("description")}
        />
        <br /> <br />
        <input
          required
          type="date"
          min={today}
          {...register("startDate")}
          onChange={onChangeStartDate}
        />
        <br /> <br />
        <input type="date" {...register("endDate")} min={minStartDate} />
        <br /> <br />
        <TextField
          sx={{
            width: 300,
          }}
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
        <Button component="label" {...register("image")}>
          Cover Image
          <input
            hidden
            accept="image/*"
            type="file"
            name="image"
            onChange={onSelectFile}
          />
        </Button>
        {selectedFile && (
          <span>
            <img src={preview} width={200} />
          </span>
        )}
        <br /> <br />
        <Button type="submit" variant="contained">
          Add Vacation
        </Button>
      </form>
    </div>
  );
}
export default AddVacation;
