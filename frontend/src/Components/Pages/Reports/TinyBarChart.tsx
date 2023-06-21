import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RootState } from "../../Redux/TravelApp";
import Vacation from "../../Models/Vacation";
import { CSVLink } from "react-csv";
import { Button } from "@mui/material";

interface BarItem {
  followers: number;
  destination: string;
}

export default function TinyBarChart() {
  const allFollowers = useSelector(
    (state: RootState) => state.followers.allFollowers
  );
  const vacations: Vacation[] = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  const getFollowersCountByVacationId = (vacationId: number): number => {
    const sum = allFollowers.filter(
      (follower) => follower.vacationId === vacationId
    ).length;
    return sum;
  };

  const headers = [
    { label: "Destination", key: "destination" },
    { label: "Followers", key: "followers" },
  ];
  const data: BarItem[] = vacations.map((vacation) => {
    return {
      followers: getFollowersCountByVacationId(vacation.id),
      destination: vacation.destination,
    };
  });

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        width={1250}
        height={600}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 250,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="destination" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="followers" fill="#8884d8" />
      </BarChart>

      <Button variant="contained">
        <CSVLink
          data={data}
          style={{ color: "white" }}
          filename={"Vacation Followers.csv"}
          headers={headers}
        >
          Download Chart
        </CSVLink>
      </Button>
    </div>
  );
}
