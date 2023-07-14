import { ButtonGroup, Button, Box } from "@mui/material";

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
      size="medium"
      aria-label="medium  button group"
      sx={{ mb: 2 }}
    >
      <Button onClick={handleFutureVacations}>Future Vacations</Button>
      <Button onClick={handleActiveVacations}>Active</Button>
      <Button onClick={handleAllVacations}>All Vacations</Button>
      <Button onClick={handleFollowedVacations}>Followed</Button>
    </ButtonGroup>
  );
}
