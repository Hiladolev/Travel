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

interface BarItem {
  followersCount: number;
  destination: string;
}

export default function TinyBarChart() {
  const followers = useSelector(
    (state: RootState) => state.followers.allFollowers
  );
  const vacations: Vacation[] = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  const getFollowersCountByVacationId = (vacationId: number): number => {
    const sum = followers.filter(
      (follower) => follower.vacationId === vacationId
    ).length;
    return sum;
  };
  const data: BarItem[] = vacations.map((vacation) => {
    return {
      followersCount: getFollowersCountByVacationId(vacation.id),
      destination: vacation.destination,
    };
  });

  return (
    <BarChart
      width={1250}
      height={600}
      data={data}
      margin={{
        top: 10,
        right: 0,
        left: 100,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="destination" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="followersCount" fill="#8884d8" />
    </BarChart>
  );
}
