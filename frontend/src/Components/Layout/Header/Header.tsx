import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Link } from "react-router-dom";
import { RootState } from "../../Redux/TravelApp";
import { useSelector } from "react-redux";
import "mdb-ui-kit/css/mdb.min.css";
import AdminNavLinks from "./AdminNavLinks";
import UserMenu from "./UserMenu";

function Header() {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status = currentUser?.role;
  let homePage = "";
  switch (status) {
    case "admin":
      homePage = "/";
      break;
    case "user":
      homePage = "/";
      break;
    default:
      homePage = "/login";
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LuggageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to={homePage} replace>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Paradise Seekers
            </Typography>
          </Link>
          {status === "admin" && <AdminNavLinks />}
          {currentUser && (
            <>
              {" "}
              <div style={{ marginLeft: "auto" }}>
                Welcome Back,
                {`${currentUser.firstName} ${currentUser.lastName}  `}
              </div>
              <UserMenu />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
