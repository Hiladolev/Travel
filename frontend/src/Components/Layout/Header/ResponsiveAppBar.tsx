import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/TravelApp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../Redux/UserReducer";

const pages = ["Add", "Reports"];
const logout = "Logout";

function ResponsiveAppBar() {
  const dispatch = useDispatch();
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

  const firstLetter = currentUser?.firstName[0].toUpperCase();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClicked = () => {
    dispatch(userLogoutAction());
    navigate("/login");
  };

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
          {status === "admin" && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to={"/add"} replace>
                <Typography
                  variant="button"
                  sx={{
                    my: 3,
                    color: "white",
                    display: "block",
                  }}
                >
                  {pages[0]}
                </Typography>
              </Link>

              <Link to={"/reports"} replace>
                <Typography
                  variant="button"
                  sx={{
                    my: 3,
                    color: "white",
                    display: "block",
                    marginLeft: "10px",
                  }}
                >
                  {pages[1]}
                </Typography>
              </Link>
            </Box>
          )}
          {currentUser && (
            <>
              {" "}
              <div style={{ marginLeft: "auto" }}>
                Welcome Back,
                {`${currentUser.firstName} ${currentUser.lastName}  `}
              </div>
              <Box sx={{ flexGrow: 0, marginLeft: "10px" }}>
                <Tooltip title="Logout">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={currentUser && firstLetter}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={handleLogoutClicked}
                    >
                      {logout}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
