import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import Logo from "./Logo";

const adminPages = ["add", "reports"];
const displaySettings = {
  xs: "flex",
  md: "none",
};
function XSHamburgerMenu(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status = currentUser?.role;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      {status === "admin" && (
        <Box sx={{ flexGrow: 1, display: displaySettings }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {adminPages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link to={`/${page}`} replace>
                  <Typography textAlign="center" color={"black"}>
                    {page}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
      <Logo xs={displaySettings.xs} md={displaySettings.md} />
    </>
  );
}

export default XSHamburgerMenu;
