import VacationCard from "./VacationCard/VacationCard";
import Vacation from "../../Models/Vacation";

interface VacationFeedProps {
  currentVacations: Vacation[];
}
export function VacationFeed({
  currentVacations,
}: VacationFeedProps): JSX.Element {
  return (
    <div className="container">
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
    </div>
  );
}
