import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { RootState } from "../../Redux/TravelApp";
import { useSelector } from "react-redux";
import "mdb-ui-kit/css/mdb.min.css";
import AdminNavLinks from "./AdminNavLinks";
import UserMenu from "./UserMenu";
import Logo from "./Logo";
import LuggageIcon from "@mui/icons-material/Luggage";
import WelcomeMessage from "./WelcomeMessage";

function Header() {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status = currentUser?.role;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LuggageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Logo />
          {status === "admin" && <AdminNavLinks />}
          {currentUser && (
            <>
              <WelcomeMessage />
              <UserMenu />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
