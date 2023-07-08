import { Button, Grid } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { UseFormRegister } from "react-hook-form";
import Vacation from "../../Models/Vacation";
import { useEffect, useState } from "react";

interface UploadImageProps {
  register: UseFormRegister<Vacation>;
}
const defaultImage =
  "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg";
function UploadImage({ register }: UploadImageProps): JSX.Element {
  const [preview, setPreview] = useState<string>(defaultImage);

  useEffect(() => {
    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const onSelectFile = (e: any): void => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  return (
    <div
      style={{
        width: 240,
        height: 160,
        border: "1px solid black",
        borderRadius: "10px",
        marginTop: "11px",
        marginLeft: "90px",
      }}
    >
      <Button
        style={{
          position: "absolute",
          backgroundColor: "rgba(79, 79, 79, 0.7)",
        }}
        variant="contained"
        {...register("image", { required: true })}
        sx={{ mt: "55px", ml: "37px" }}
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

      <img
        src={preview}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "10px",
        }}
        alt="vacation"
      />
    </div>
  );
}

export default UploadImage;
