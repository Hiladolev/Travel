import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/TravelApp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../Redux/UserReducer";
import { useState } from "react";
import "mdb-ui-kit/css/mdb.min.css";
import AdminNavLinks from "./AdminNavLinks";
import LogoutTooltip from "./LogoutTooltip";

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
              <LogoutTooltip />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
