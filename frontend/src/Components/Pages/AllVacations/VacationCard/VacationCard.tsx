import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/TravelApp";
import { AdminCardControls } from "./AdminCardControls/AdminCardControls";
import { UserCardControls } from "./UserCardControls/UserCardControls";

interface vacProps {
  id: number;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string;
}

const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  const myNewDate = formattedDate.split("-");
  return `${myNewDate[2]}/${myNewDate[1]}/${myNewDate[0]}`;
};

function VacationCard(props: vacProps): JSX.Element {
  const currentUserRole = useSelector(
    (state: RootState) => state.users.currentUser.role
  );

  return (
    <Card
      className="card"
      sx={{ height: 370, display: "flex", flexDirection: "column" }}
    >
      {currentUserRole === "user" ? (
        <UserCardControls id={props.id} />
      ) : (
        <AdminCardControls id={props.id} />
      )}

      <CardMedia
        component="img"
        height="190"
        src={`${process.env.REACT_APP_API_URL}/images/${props.image}`}
        alt={props.destination}
      />
      <CardContent>
        <Typography variant="h5">{props.destination}</Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(props.startDate)} - {formatDate(props.endDate)} <br />
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {props.description}
        </Typography>
      </CardContent>
      <Button fullWidth color="primary" variant="contained" sx={{ mt: "auto" }}>
        ${props.price}
      </Button>
    </Card>
  );
}
export default VacationCard;
