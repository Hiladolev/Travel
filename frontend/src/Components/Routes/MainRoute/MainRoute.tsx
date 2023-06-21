import { Navigate, Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Add from "../../Pages/AddVacation/AddVacation";
import Page404 from "../../Pages/Page404/Page404";
import Edit from "../../Pages/Edit/Edit";
import Register from "../../Pages/Register/Register";
import VacationsPage from "../../Pages/VacationsPage/VacationsPage";
import GuestPage from "../../Pages/GuestPage/GuestPage";
import SignIn from "../../Pages/Login/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import Reports from "../../Pages/Reports/Reports";
import Admin from "../../Pages/Admin/Admin";
import Example from "../../Pages/Reports/TinyBarChart";
import { ResponsiveContainer } from "recharts/types/component/ResponsiveContainer";
import TinyBarChart from "../../Pages/Reports/TinyBarChart";

function MainRoute(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status = currentUser?.role;
  // const AdminPermission = () => {
  //   if (status === "admin") {
  //     return <Reports />;
  //   } else {
  //     return <Navigate to="/*" replace />;
  //   }
  // };

  // const UserPermission = () => {
  //   if (status === "user" || status === "admin") {
  //     return <VacationsPage />;
  //   } else {
  //     return <Navigate to="/guest" replace />;
  //   }
  // };
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/chart" element={<TinyBarChart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vacations" element={<VacationsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
