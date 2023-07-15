import { Button } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Vacation from "./VacationValues";
import { useEffect, useState } from "react";

interface UploadImageProps {
  register: UseFormRegister<Vacation>;
  errors: FieldErrors<Vacation>;
  defaultValue?: string;
}
const defaultImage =
  "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg";
function UploadImage({
  register,
  errors,
  defaultValue,
}: UploadImageProps): JSX.Element {
  const [preview, setPreview] = useState<string>(
    defaultValue ? defaultValue : defaultImage
  );

  const requiredTemplate = !defaultValue && { required: "Required" };
  const borderColor = errors.image ? "red" : "#9fa6b2";
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
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 260,
          height: 160,
          border: `1px solid ${borderColor}`,
          borderRadius: "10px",
          display: "inline-block",
          position: "relative",
        }}
      >
        <Button
          component="label"
          style={{
            position: "absolute",
            backgroundColor: "rgba(79, 79, 79, 0.59)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          variant="contained"
          {...register("image", requiredTemplate)}
        >
          Select Image
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
      {errors.image && (
        <p
          style={{
            color: "red",
          }}
        >
          {errors.image.message}
        </p>
      )}
    </div>
  );
}

export default UploadImage;
