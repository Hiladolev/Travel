import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
    <div
      style={{
        WebkitBoxSizing: "border-box",
        MozBoxSizing: "border-box",
        boxSizing: "border-box",
        padding: "10px",
        width: "100%",
        height: "400px",
        textAlign: "center",
        marginTop: "5%",
      }}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="destination" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="followers" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <Button variant="contained" sx={{ marginTop: "2%" }}>
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
