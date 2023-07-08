import { Button, Grid } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { UseFormRegister } from "react-hook-form";
import Vacation from "../../Models/Vacation";

interface UploadImageProps {
  register: UseFormRegister<Vacation>;
  onSelectFile: (e: any) => void;
  selectedFile?: File;
  preview: string;
}

function UploadImage({
  register,
  onSelectFile,
  selectedFile,
  preview,
}: UploadImageProps): JSX.Element {
  return (
    <>
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
    </>
  );
}

export default UploadImage;
