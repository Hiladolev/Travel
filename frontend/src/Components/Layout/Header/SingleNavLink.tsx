import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface NavLinkProps {
  path: string;
}

function SingleNavLink(props: NavLinkProps): JSX.Element {
  return (
    <Link to={`/${props.path}`} replace>
      <Typography
        variant="button"
        sx={{
          my: 3,
          ml: 1,
          color: "white",
          display: "block",
        }}
      >
        {props.path}
      </Typography>
    </Link>
  );
}

export default SingleNavLink;
