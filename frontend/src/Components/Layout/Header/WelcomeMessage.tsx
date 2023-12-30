import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import Typography from "@mui/material/Typography";
import { useTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function WelcomeMessage(): JSX.Element {
  const theme = useTheme() as Theme;
  const isXlg = useMediaQuery(theme.breakpoints.up("xl"));
  const displayMessage = isXlg ? "inline" : "none";
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  return (
    <Typography
      color="inherit"
      paragraph
      sx={{
        fontFamily: "sans-serif",
        marginBlockStart: "5%",
        display: displayMessage,
      }}
    >
      {` ${currentUser.firstName} ${currentUser.lastName}  `}
    </Typography>
  );
}
export default WelcomeMessage;
