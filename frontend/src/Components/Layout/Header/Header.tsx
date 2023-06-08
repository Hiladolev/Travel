import { NavLink } from "react-router-dom";
import "./Header.css";
import "mdb-ui-kit/css/mdb.min.css";
import ResponsiveAppBar from "./ResponsiveAppBar";

function Header(): JSX.Element {
  return (
    // <div className="p-4 text-center bg-light">
    //   <h1 className="mb-3">Heading</h1>
    //   <h1 className="headline">Travel Now</h1>
    //   <NavLink to={"/add"}>Add Vacation</NavLink> |&nbsp;
    //   <NavLink to={"/"}>Home</NavLink> |&nbsp;
    //   <NavLink to={"/edit"}>Edit</NavLink>|&nbsp;
    //   <NavLink to={"/register"}>Register</NavLink>
    // </div>
    <ResponsiveAppBar />
  );
}

export default Header;
