import { Box, Fab } from "@mui/material";
import AlertDialog from "../AlertDialog";
import EditIcon from "@mui/icons-material/Edit";

interface AdminCardControlsProps {
  id: number;
  edit?: (id: number) => void;
}
export function AdminCardControls({
  edit,
  id,
}: AdminCardControlsProps): JSX.Element {
  const editVacation = () => {
    edit(id);
  };
  return (
    <Box>
      <Fab
        variant="extended"
        size="small"
        style={{
          position: "absolute",
          top: 8,
          left: 4,
        }}
        onClick={editVacation}
      >
        <EditIcon />
      </Fab>
      <AlertDialog id={id} />
    </Box>
  );
}
