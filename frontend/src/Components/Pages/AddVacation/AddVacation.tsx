import Vacation from "../../Models/Vacation";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addVacationAction } from "../../Redux/VacationReducer";
import FormData from "form-data";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function AddVacation(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const defaultTheme = createTheme();

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

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(addNewVacation)}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Destination"
                  variant="outlined"
                  required
                  {...register("destination")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  label="Description"
                  required
                  {...register("description")}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: 190 }}
                  InputLabelProps={{ shrink: true }}
                  required
                  label="Start Date"
                  type="date"
                  {...register("startDate")}
                  inputProps={{ min: today }}
                  onChange={onChangeStartDate}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: 190 }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: minStartDate }}
                  required
                  label="End Date"
                  type="date"
                  {...register("endDate")}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  placeholder="$"
                  required
                  {...register("price", {
                    valueAsNumber: true,
                    min: 0,
                    max: 10000,
                  })}
                />
              </Grid>
              {errors.price && (
                <div style={{ color: "red" }}>Limit Price is $10,000</div>
              )}
              <Button
                component="label"
                {...register("image", { required: true })}
                sx={{ mt: 3, mb: 2 }}
              >
                Cover Image
                <AddAPhotoIcon />
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={onSelectFile}
                />
              </Button>
              {selectedFile ? (
                <Grid item xs={4}>
                  <img
                    src={preview}
                    width={240}
                    style={{
                      maxHeight: 160,
                      border: "1px solid black",
                      borderRadius: "10px",
                    }}
                    alt="vacation"
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <img
                    src={
                      "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
                    }
                    width={240}
                    style={{
                      maxHeight: 160,
                      border: "1px solid black",
                      borderRadius: "10px",
                    }}
                    alt="upload sign"
                  />
                </Grid>
              )}
              <Button
                sx={{ mt: 2 }}
                fullWidth
                type="reset"
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button
                sx={{ mt: 1 }}
                fullWidth
                type="submit"
                variant="contained"
              >
                Add Vacation
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default AddVacation;
