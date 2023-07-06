import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { userLogoutAction } from "../../Redux/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/TravelApp";

function LogoutTooltip(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status = currentUser?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstLetter = currentUser?.firstName[0].toUpperCase();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
    <>
      <Box sx={{ flexGrow: 0, marginLeft: "10px" }}>
        <Tooltip title="Logout">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={currentUser && firstLetter}
              src="/static/images/avatar/2.jpg"
            />
          </IconButton>
        </Tooltip>
      </Box>
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
          <Typography textAlign="center" onClick={handleLogoutClicked}>
            Logout{" "}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default LogoutTooltip;
