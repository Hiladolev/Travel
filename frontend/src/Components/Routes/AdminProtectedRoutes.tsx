import { useSelector } from "react-redux";
import { RootState } from "../Redux/TravelApp";
import { Outlet } from "react-router-dom";

export function AdminProtectedRoutes(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status: string | undefined = currentUser?.role;
  return <>{status === "admin" ? <Outlet /> : null}</>;
}
