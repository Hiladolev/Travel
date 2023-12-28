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
          color: "white",
          display: "block",
          textTransform: "none",
          border: "2px solid white",
          borderRadius: "30px",
          padding: "10px 22px",
        }}
      >
        {props.path}
      </Typography>
    </Link>
  );
}

export default SingleNavLink;
