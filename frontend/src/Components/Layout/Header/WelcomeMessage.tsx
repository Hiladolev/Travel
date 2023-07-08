import { useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";

function WelcomeMessage(): JSX.Element {
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  return (
    <div style={{ marginLeft: "auto" }}>
      Welcome,
      {` ${currentUser.firstName} ${currentUser.lastName}  `}
    </div>
  );
}
export default WelcomeMessage;
