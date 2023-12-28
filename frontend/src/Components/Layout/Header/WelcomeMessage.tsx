import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import Typography from "@mui/material/Typography";

function WelcomeMessage(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  return (
    <Typography
      color="inherit"
      paragraph
      sx={{ fontFamily: "sans-serif" }}
      marginTop={"1.3%"}
    >
      Welcome,
      {` ${currentUser.firstName} ${currentUser.lastName}  `}
    </Typography>
  );
}
export default WelcomeMessage;
