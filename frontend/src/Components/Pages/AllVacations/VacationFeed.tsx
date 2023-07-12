import { Grid } from "@mui/material";
import VacationCard from "./VacationCard/VacationCard";
import Vacation from "../../Models/Vacation";

interface VacationFeedProps {
  currentVacations: Vacation[];
}
export function VacationFeed({
  currentVacations,
}: VacationFeedProps): JSX.Element {
  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {currentVacations.map((item) => (
        <VacationCard
          key={item.id}
          destination={item.destination}
          description={item.description}
          startDate={item.startDate}
          endDate={item.endDate}
          price={item.price}
          image={item.image}
          id={item.id}
        />
      ))}
    </Grid>
  );
}
