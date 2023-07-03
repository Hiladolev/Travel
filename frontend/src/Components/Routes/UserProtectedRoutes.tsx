import { useSelector } from "react-redux";
import { RootState } from "../Redux/TravelApp";
import { Outlet } from "react-router-dom";
import Page404 from "../Pages/Page404/Page404";

export function UserProtectedRoutes(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const adminOrUser: string | undefined = currentUser?.role;
  return <>{adminOrUser ? <Outlet /> : <Page404 />}</>;
}
