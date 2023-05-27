import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Add from "../../Pages/AddVacation/AddVacation";
import AllVacations from "../../Pages/AllVacations/AllVacations";
import Page404 from "../../Pages/Page404/Page404";
import Edit from "../../Pages/Edit/Edit";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/" element={<AllVacations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
