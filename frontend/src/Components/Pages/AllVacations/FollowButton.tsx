import { Button, ToggleButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, travel } from "../../Redux/TravelApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import axios from "axios";

interface FollowProps {
  // value: number;
  vacationId: number;
}

function FollowButton(props: FollowProps): JSX.Element {
  const [selected, setSelected] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const [followersVal, setFollowersVal] = useState<number>(0);
  const followers = useSelector(
    (state: RootState) => state.followers.allFollowers
  );
  useEffect(() => {
    const count = followers.filter(
      (follower) => follower.vacationId === props.vacationId
    ).length;
    setFollowersVal(count);
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
      {followersVal}
    </ToggleButton>
  );
}
export default FollowButton;
