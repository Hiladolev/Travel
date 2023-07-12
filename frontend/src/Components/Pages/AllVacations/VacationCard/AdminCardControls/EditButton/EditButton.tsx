import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  id: number;
}
export function EditButton({ id }: EditButtonProps): JSX.Element {
  const navigate = useNavigate();

  const editVacation = (id: number) => {
    navigate(`/edit/${id}`);
  };
  return (
    <Fab
      variant="extended"
      size="small"
      style={{
        position: "absolute",
        top: 8,
        left: 4,
      }}
      onClick={() => editVacation(id)}
    >
      <EditIcon />
    </Fab>
  );
}
