import { ResponsiveContainer } from "recharts";
import "./Reports.css";
import TinyBarChart from "./TinyBarChart";

function Reports(): JSX.Element {
  return (
    <div className="Reports">
      <ResponsiveContainer width="100%" height="100%">
        <TinyBarChart />
      </ResponsiveContainer>
    </div>
  );
}

export default Reports;
