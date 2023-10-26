import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import LuggageIcon from "@mui/icons-material/Luggage";

interface DisplaySettingsProps {
  xs: string;
  md: string;
}
function Logo(props: DisplaySettingsProps): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const status = currentUser?.role;
  let homePage = "/login";
  homePage = !!status && "/";
  return (
    <>
      <LuggageIcon sx={{ display: { xs: props.xs, md: props.md }, mr: 1 }} />
      <Link to={homePage} replace>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: props.xs, md: props.md },
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
