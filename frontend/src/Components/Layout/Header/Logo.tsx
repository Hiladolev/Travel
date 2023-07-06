import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import LuggageIcon from "@mui/icons-material/Luggage";

const displaySettings = {
  xs: "none",
  md: "flex",
};

function Logo(): JSX.Element {
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
    <>
      <LuggageIcon sx={{ display: displaySettings, mr: 1 }} />
      <Link to={homePage} replace>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: displaySettings,
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
    </>
  );
}

export default Logo;
