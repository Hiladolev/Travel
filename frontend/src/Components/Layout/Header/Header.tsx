import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { RootState } from "../../Redux/TravelApp";
import { useSelector } from "react-redux";
import "mdb-ui-kit/css/mdb.min.css";
import AdminNavLinks from "./AdminNavLinks";
import UserMenu from "./UserMenu";
import Logo from "./Logo";
import WelcomeMessage from "./WelcomeMessage";
import XSHamburgerMenu from "./XSHamburgerMenu";

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
    <AppBar position="static" sx={{ paddingInline: "0.6%" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo xs={displaySettings.xs} md={displaySettings.md} />
          <XSHamburgerMenu />
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
