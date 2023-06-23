import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid";
import FollowButton from "../FollowButton";

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

function SingleVac(props: vacProps): JSX.Element {
  return (
    <Grid item xs={3}>
      <Card
        variant="outlined"
        className="card"
        sx={{ width: 300, height: 400, maxHeight: 400, maxWidth: 300 }}
      >
        <CardHeader />
        <FollowButton vacationId={props.id} />
        <CardMedia
          component="img"
          height="190"
          src={`http://localhost:4000/images/${props.image}`}
          alt={props.destination}
        />
        <CardContent>
          <Typography variant="h5">{props.destination}</Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(props.startDate)} - {formatDate(props.endDate)} <br />
            {props.description}
          </Typography>
        </CardContent>
        <Button
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
          }}
          color="primary"
          variant="contained"
        >
          ${props.price}
        </Button>
      </Card>
    </Grid>
  );
}
export default SingleVac;
