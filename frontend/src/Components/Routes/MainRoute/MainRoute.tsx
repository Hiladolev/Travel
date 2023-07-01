import {
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Add from "../../Pages/AddVacation/AddVacation";
import Page404 from "../../Pages/Page404/Page404";
import Edit from "../../Pages/Edit/Edit";
import VacationsPage from "../../Pages/VacationsPage/VacationsPage";
import SignIn from "../../Pages/Login/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import TinyBarChart from "../../Pages/Reports/TinyBarChart";
import SignUp from "../../Pages/Register/SignUp";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import axios from "axios";
{
  /* <Route
      element={<Team />}
      path="teams/:teamId"
      loader={async ({ params }) => {
        return fetch(`/fake/api/teams/${params.teamId}.json`);
      }}
      action={async ({ request }) => {
        return updateFakeTeam(await request.formData());
      }}
      errorElement={<ErrorBoundary />}
    /> */
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<VacationsPage />} />
      <Route path="/add" element={<Add />} />
      <Route path="/page404" element={<Page404 />} />
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
      <Route path="/reports" element={<TinyBarChart />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      {/* <Route
          path="*"
          element={!status ? <Navigate to="/login" replace /> : <Page404 />}
        /> */}
    </Route>
  )
);

function MainRoute(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status: string | undefined = currentUser?.role;
  return (
    <div className="MainRoute">
      <Routes>
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
      </Routes>
    </div>
  );
}

export default MainRoute;
