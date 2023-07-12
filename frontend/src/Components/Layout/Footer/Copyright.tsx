import { Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import Link from "@mui/material/Link";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="primary.contrastText"
      fontFamily={["Roboto", "Helvetica", "Arial", "sans-serif"]}
      className="textAlignCenter"
    >
      Made with <FavoriteIcon sx={{ color: pink[500] }} /> By &nbsp;
      <Link color="primary.contrastText" href="https://github.com/Hiladolev">
        Hila Dolev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
