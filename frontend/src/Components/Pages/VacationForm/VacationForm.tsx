import { Box, Grid, TextField, Button } from "@mui/material";
import UploadImage from "./UploadImage";
import { useForm, useWatch } from "react-hook-form";
import Vacation from "./VacationValues";

interface VacationFormProps {
  addNewVacation: any;
  minStartDate: string;
  defaultValues?: {
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    image: string;
  };
}

function VacationForm({
  addNewVacation,
  defaultValues,
  minStartDate,
}: VacationFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Vacation>({
    defaultValues,
  });

  const startMin = useWatch({
    name: "startDate",
    control,
    defaultValue: minStartDate,
  })?.toString();

  const requiredTemplate = {
    required: {
      value: true,
      message: "Required",
    },
  };
  return (
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
            {...register("destination", requiredTemplate)}
            error={!!errors.destination}
            helperText={errors.destination?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            label="Description"
            {...register("description", requiredTemplate)}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: 190 }}
            InputLabelProps={{ shrink: true }}
            label="Start Date"
            type="date"
            {...register("startDate", {
              ...requiredTemplate,
              min: { value: minStartDate, message: "Invalid date" },
            })}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
            inputProps={{ min: minStartDate }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: 190 }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: startMin }}
            label="End Date"
            type="date"
            {...register("endDate", {
              ...requiredTemplate,
              min: {
                value: startMin,
                message: "Must be after start date",
              },
            })}
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            placeholder="$"
            required
            {...register("price", {
              ...requiredTemplate,
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Price must be positive",
              },
              max: {
                value: 10000,
                message: "Price must be below 10,000",
              },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Grid>
        <UploadImage
          register={register}
          errors={errors}
          defaultValue={defaultValues?.image}
        />
        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained">
            Add Vacation
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="reset" variant="outlined">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VacationForm;
