import { ButtonGroup, Button } from "@mui/material";

interface VacationFiltersProps {
  handleFutureVacations: () => void;
  handleActiveVacations: () => void;
  handleAllVacations: () => void;
  handleFollowedVacations: () => void;
}
export function VacationFilters({
  handleFutureVacations,
  handleActiveVacations,
  handleAllVacations,
  handleFollowedVacations,
}: VacationFiltersProps): JSX.Element {
  return (
    <ButtonGroup
      variant="contained"
      size="small"
      aria-label="small button group"
    >
      <Button onClick={handleFutureVacations}>Future Vacations</Button>
      <Button onClick={handleActiveVacations}>Active</Button>
      <Button onClick={handleAllVacations}>All Vacations</Button>
      <Button onClick={handleFollowedVacations}>Followed</Button>
    </ButtonGroup>
  );
}
