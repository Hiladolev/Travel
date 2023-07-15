import VacationCard from "./VacationCard/VacationCard";
import Vacation from "../../Models/Vacation";
import { Container, Grid } from "@mui/material";

interface VacationFeedProps {
  currentVacations: Vacation[];
}
export function VacationFeed({
  currentVacations,
}: VacationFeedProps): JSX.Element {
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {currentVacations.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
