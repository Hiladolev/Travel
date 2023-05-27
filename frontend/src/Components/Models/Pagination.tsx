import { Box, Pagination } from "@mui/material";

interface vacationsProps {
  vacationsPerPage: number;
  totalVacations: number;
  paginate: (number: number) => void;
}

const AppPagination = (props: vacationsProps) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalVacations / props.vacationsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      sx={{ margin: "20px 0px" }}
    >
      {pageNumbers.map((number) => (
        <div key={number}>
          <button onClick={() => props.paginate(number)}>{number}</button>
        </div>
      ))}
    </Box>
  );
};

export default AppPagination;
