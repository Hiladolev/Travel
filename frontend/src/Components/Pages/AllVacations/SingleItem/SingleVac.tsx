import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface vacProps {
  id: number;
  likes: number;
  value: number;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string;
  onClick: (id: number) => void;
}

const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  const myNewDate = formattedDate.split("-");
  return `${myNewDate[2]}/${myNewDate[1]}/${myNewDate[0]}`;
};

const likes: Record<number, number> = {}; // Object to store like counts

function SingleVac(props: vacProps): JSX.Element {
  const likesHandler = () => {
    props.onClick(props.id);
  };

  const cardLikes = likes[props.id] || 0;

  return (
    <Grid item xs={3}>
      <Card
        variant="outlined"
        className="card"
        sx={{ width: 300, height: 400, maxHeight: 400, maxWidth: 300 }}
      >
        <CardHeader />
        <Button
          size="small"
          style={{
            position: "absolute",
            top: 35,
            left: 10,
            background: "white",
          }}
          onClick={likesHandler}
        >
          {props.value}
          <FavoriteIcon />
        </Button>
        <CardMedia
          component="img"
          height="190"
          src={props.image}
          alt={props.destination}
        />

        <CardContent>
          <Typography variant="h4">{props.destination}</Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(props.startDate)} - {formatDate(props.endDate)} <br />
            {props.description}
          </Typography>
        </CardContent>
        <Button color="primary" variant="contained">
          ${props.price}
        </Button>
      </Card>
    </Grid>
  );
}
export default SingleVac;
