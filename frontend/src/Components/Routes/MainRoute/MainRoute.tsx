import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Add from "../../Pages/AddVacation/AddVacation";
import Page404 from "../../Pages/Page404/Page404";
import EditVacation from "../../Pages/EditVacation/EditVacation";
import VacationsPage from "../../Pages/VacationsPage/VacationsPage";
import Login from "../../Pages/Login/Login";
import Chart from "../../Pages/Reports/Chart";
import Register from "../../Pages/Register/Register";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import axios from "axios";
import { AdminProtectedRoutes } from "../AdminProtectedRoutes";
import { UserProtectedRoutes } from "../UserProtectedRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";

export function MainRouterProvider(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route
          path="/login"
          element={<Login />}
          loader={() => {
            const loggedIn = currentUser;

            if (loggedIn) {
              return redirect("/");
            }

            return null;
          }}
        />

        <Route element={<UserProtectedRoutes />}>
          <Route
            path="/"
            element={<VacationsPage />}
            loader={() => {
              const loggedIn = currentUser;

              if (!loggedIn) {
                return redirect("/login");
              }

              return null;
            }}
          />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/add" element={<Add />} />
          <Route path="/reports" element={<Chart />} />
          <Route
            path="/edit/:id"
            element={<EditVacation />}
            loader={async ({ params }) => {
              const result = await axios
                .get(
                  `${process.env.REACT_APP_API_URL}/api/v1/vacations/getVacationById/${params.id}`
                )
                .then((response) => response.data);
              if (result.length === 0) {
                return redirect("/page404");
              }
              return result[0];
            }}
          />
        </Route>

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
