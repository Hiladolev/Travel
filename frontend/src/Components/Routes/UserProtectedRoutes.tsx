import { useSelector } from "react-redux";
import { RootState } from "../Redux/TravelApp";
import { Outlet, isRouteErrorResponse, useRouteError } from "react-router-dom";

export function UserProtectedRoutes(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status: string | undefined = currentUser?.role;
  return <>{status ? <Outlet /> : null}</>;
}
