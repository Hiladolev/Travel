import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Add from "../../Pages/AddVacation/AddVacation";
import Page404 from "../../Pages/Page404/Page404";
import Edit from "../../Pages/Edit/Edit";
import VacationsPage from "../../Pages/VacationsPage/VacationsPage";
import SignIn from "../../Pages/Login/SignIn";
import TinyBarChart from "../../Pages/Reports/TinyBarChart";
import SignUp from "../../Pages/Register/SignUp";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import axios from "axios";
import { AdminProtectedRoutes } from "../AdminProtectedRoutes";
import { UserProtectedRoutes } from "../UserProtectedRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<UserProtectedRoutes />}>
        <Route path="/" element={<VacationsPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route element={<AdminProtectedRoutes />}>
        <Route path="/add" element={<Add />} />
        <Route path="/reports" element={<TinyBarChart />} />
        <Route
          path="/edit/:id"
          element={<Edit />}
          loader={async ({ params }) => {
            const result = await axios
              .get(
                `${process.env.REACT_APP_API_URL}/api/v1/vacations/getVacationById/${params.id}`
              )
              .then((response) => response.data);
            if (result.length === 0) {
              return redirect("/page404");
            }
            return null;
          }}
        />
      </Route>

      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      {/* <Routes>
        {status === "admin" && (
          <>
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/reports" element={<TinyBarChart />} />
          </>
        )}

        {status && <Route path="/" element={<VacationsPage />} />}

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="*"
          element={!status ? <Navigate to="/login" replace /> : <Page404 />}
        />
      </Routes> */}
    </div>
  );
}

export default MainRoute;
