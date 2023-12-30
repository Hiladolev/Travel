import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface NavLinkProps {
  path: string;
}

function SingleNavLink(props: NavLinkProps): JSX.Element {
  return (
    <Link to={`/${props.path}`} replace>
      <IconButton edge="end" size="small" aria-label="nav link">
        <Typography
          variant="button"
          sx={{
            color: "white",
            display: "block",
            textTransform: "none",
            borderRadius: "50%",
            padding: "10px 22px",
          }}
        >
          {props.path}
        </Typography>
      </IconButton>
    </Link>
  );
}

export default SingleNavLink;
