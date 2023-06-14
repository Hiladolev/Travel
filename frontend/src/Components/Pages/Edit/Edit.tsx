import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { useForm } from "react-hook-form";
import { travel } from "../../Redux/TravelApp";
import Vacation from "../../Models/Vacation";
import { updateVacationAction } from "../../Redux/VacationReducer";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { url } from "inspector";

function Edit(): JSX.Element {
  const [refresh, setRefresh] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<undefined | string>();
  const navigate = useNavigate();
  const params = useParams();
  const [vacation, setVacation] = useState<Vacation>(
    new Vacation("", "", new Date(), new Date(), 0, "")
  );

  useEffect(() => {
    getVacationById();

    // .then(() => setPreview(`http://localhost:4000/images/${vacation.image}`));

    // const objectUrl = URL.createObjectURL(selectedFile);
    // setPreview(objectUrl);
    // // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, []);
  const getVacationById = async () => {
    try {
      const getVacationInfo = await axios
        .get(
          `http://localhost:4000/api/v1/vacations/getVacationById/${params.id}`
        )
        .then((response) => setVacation(response.data[0]));
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };
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
          defaultValue={vacation && vacation.destination}
        />
        <br /> <br />
        <TextField
          multiline
          rows={2}
          label="Description"
          required
          {...register("description")}
          defaultValue={vacation && vacation.description}
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
          defaultValue={vacation && vacation.price}
        />
        {errors.price && (
          <div style={{ color: "red" }}>Limit Price is $10,000</div>
        )}
        <br /> <br />
        <Button variant="contained" component="label" {...register("image")}>
          Cover Image
          <input
            hidden
            accept="image/*"
            type="file"
            name="image"
            onChange={onSelectFile}
          />
        </Button>
        <span>
          <img src={preview} width={200} />
        </span>
        <br />
        <Button type="submit">Add Vacation</Button>
      </form>
    </div>
  );
}

export default Edit;
