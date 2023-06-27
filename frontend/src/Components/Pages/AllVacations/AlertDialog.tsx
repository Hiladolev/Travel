import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteVacationAction } from "../../Redux/VacationReducer";
import { useState } from "react";
import { Fab } from "@mui/material";

export interface AlertProps {
  id: number;
}
export default function AlertDialog(props: AlertProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteAction = (vacationId: number) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/v1/vacations/delete/${vacationId}`
      )
      .then((response) => response.data);
    dispatch(deleteVacationAction(vacationId));
    setOpen(false);
  };
  return (
    <>
      {/* <Button
        variant="outlined"
        onClick={handleClickOpen}
        size="small"
        style={{
          position: "absolute",
          top: 35,
          left: 70,
          background: "white",
        }}
      >
        Delete
        <DeleteOutlineIcon />
      </Button> */}
      <Fab
        variant="extended"
        size="small"
        style={{
          position: "absolute",
          top: 8,
          left: 50,
        }}
        onClick={handleClickOpen}
      >
        <DeleteOutlineIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this vacation?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDeleteAction(props.id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
