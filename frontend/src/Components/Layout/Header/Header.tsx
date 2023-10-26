import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { RootState } from "../../Redux/TravelApp";
import { useSelector } from "react-redux";
import "mdb-ui-kit/css/mdb.min.css";
import AdminNavLinks from "./AdminNavLinks/AdminNavLinks";
import LogoutAvatar from "./LogoutAvatar";
import Logo from "./LogoButton";
import WelcomeMessage from "./WelcomeMessage";
import HamburgerMenu from "./HamburgerMenu";

const displaySettings = {
  xs: "none",
  md: "flex",
};

function Header() {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status = currentUser?.role;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo xs={displaySettings.xs} md={displaySettings.md} />
          <HamburgerMenu />
          {status === "admin" && <AdminNavLinks />}
          {currentUser && (
            <>
              <WelcomeMessage />
              <LogoutAvatar />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
