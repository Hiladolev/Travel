import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { useForm } from "react-hook-form";
import { RootState, travel } from "../../Redux/TravelApp";
import { updateVacationAction } from "../../Redux/VacationReducer";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

type updateVac = {
  destination: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  price: number;
  image?: string;
  id?: number;
};
function Edit(): JSX.Element {
  const dispatch = useDispatch();
  const allVacations = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<undefined | string>();
  const today: string = moment().format("YYYY-MM-DD");
  const [minStartDate, setMinStartDate] = useState<string>();
  const navigate = useNavigate();
  const params = useParams();

  const onChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = moment(event.target.value).format("YYYY-MM-DD");
    setMinStartDate(selectedDate);
  };
  useEffect(() => {
    getVacationById();
  }, []);
  useEffect(() => {
    if (!selectedFile) {
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
  const formatDate = (date: Date): string => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };
  const getVacationById = async () => {
    try {
      const vacationInfo = await axios
        .get(
          `http://localhost:4000/api/v1/vacations/getVacationById/${params.id}`
        )
        .then((response) => {
          return response.data[0];
        });
      reset({
        ...vacationInfo,
        startDate: formatDate(vacationInfo.startDate),
        endDate: formatDate(vacationInfo.endDate),
      });
      setPreview(`http://localhost:4000/images/${vacationInfo.image}`);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateVac>();

  const editNewVacation = (updatedVacation: updateVac) => {
    const formControl: FormData = new FormData();
    formControl.append("destination", updatedVacation.destination);
    formControl.append("description", updatedVacation.description);
    formControl.append("startDate", updatedVacation.startDate.toString());
    formControl.append("endDate", updatedVacation.endDate.toString());
    formControl.append("price", updatedVacation.price.toString());
    formControl.append("id", params.id.toString());
    formControl.append("image", selectedFile);
    axios
      .put("http://localhost:4000/api/v1/vacations/edit", formControl)
      .then((response) => {
        const finalVacation = response.data;
        if (!finalVacation.image) {
          finalVacation.image = updatedVacation.image;
        }
        const changedVac = {
          ...finalVacation,
          price: parseInt(finalVacation.price),
          id: parseInt(params.id),
        };
        dispatch(updateVacationAction(changedVac));
        navigate("/admin");
      });
  };

  return (
    <div className="Edit">
      <h2>Edit Vacation</h2>
      <form onSubmit={handleSubmit(editNewVacation)}>
        <TextField
          sx={{
            width: 300,
          }}
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
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
          {...register("startDate")}
          min={today}
          onChange={onChangeStartDate}
        />
        <br /> <br />
        <input
          required
          type="date"
          {...register("endDate")}
          min={minStartDate}
        />
        <br /> <br />
        <TextField
          sx={{
            width: 300,
          }}
          InputLabelProps={{ shrink: true }}
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
          Change Image
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
        <br />
        <Button variant="contained" type="submit">
          Update Vacation
        </Button>
      </form>
    </div>
  );
}

export default Edit;
