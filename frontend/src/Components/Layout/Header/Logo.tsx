import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";

interface DisplaySettingsProps {
  xs: string;
  md: string;
}
function Logo(props: DisplaySettingsProps): JSX.Element {
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
      <Link to={homePage} replace>
        <IconButton size="large" aria-label="home page">
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: props.xs, md: props.md },
              fontFamily: "open sans",
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
              padding: "10px 22px",
            }}
          >
            Paradise Seekers
          </Typography>
        </IconButton>
      </Link>
    </>
  );
}

export default Logo;
