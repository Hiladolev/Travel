import "./Footer.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <div>
        Made with <FavoriteIcon sx={{ color: pink[500] }} /> By &nbsp;
        <a href="https://github.com/Hiladolev" target="_blank">
          Hila Dolev
        </a>
      </div>
    </div>
  );
}

export default Footer;
