import { Button, Grid } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { UseFormRegister } from "react-hook-form";
import Vacation from "../../Models/Vacation";
import { useEffect, useState } from "react";

interface UploadImageProps {
  register: UseFormRegister<Vacation>;
}

function UploadImage({ register }: UploadImageProps): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

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

  const onSelectFile = (e: any): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
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
