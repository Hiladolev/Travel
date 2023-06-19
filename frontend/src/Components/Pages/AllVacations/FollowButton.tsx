import { Button, ToggleButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, travel } from "../../Redux/TravelApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import axios from "axios";

interface FollowProps {
  value: number;
  vacationId: number;
}
function FollowButton(props: FollowProps): JSX.Element {
  const [selected, setSelected] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean | undefined>(undefined);
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const userId: number = currentUser.id;

  const followedVacation = () => {
    axios
      .get(
        `http://localhost:4000/api/v1/followers/followedOrNot/${userId}/${props.vacationId}`
      )
      .then((response) => {
        return setFollow(response.data);
      });
  };
  useEffect(() => {
    followedVacation();
    if (follow) {
      setSelected(true);
    }
  }, []);
  return (
    <ToggleButton
      size="small"
      style={{
        position: "absolute",
        top: 35,
        left: 10,
        background: "white",
      }}
      color="primary"
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <FavoriteIcon />
      {props.value}
    </ToggleButton>
  );
}
export default FollowButton;
