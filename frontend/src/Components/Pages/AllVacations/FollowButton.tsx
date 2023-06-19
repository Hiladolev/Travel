import { Button, ToggleButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, travel } from "../../Redux/TravelApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import axios from "axios";
import { addFollow } from "../../Redux/FollowerReducer";
import Vacation from "../../Models/Vacation";

interface FollowProps {
  vacationId: number;
}

function FollowButton(props: FollowProps): JSX.Element {
  const [selected, setSelected] = useState<boolean>(false);
  const [followersVal, setFollowersVal] = useState<number>(0);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const followers = useSelector(
    (state: RootState) => state.followers.allFollowers
  );
  const allVacations: Vacation[] = useSelector(
    (state: RootState) => state.vacations.allVacations
  );
  useEffect(() => {
    const count = followers.filter(
      (follower) => follower.vacationId === props.vacationId
    ).length;
    setFollowersVal(count);

    const currentUserFollow = followers.filter(
      (follower) => follower.userId === currentUser.id
    );
    const followedByCurrentUser = currentUserFollow.find(
      (follow) => follow.vacationId === props.vacationId
    );
    if (followedByCurrentUser) {
      setSelected(true);
    }
  }, []);

  const followClicked = () => {
    setSelected(!selected);
    if (!selected) {
      axios
        .post(
          `http://localhost:4000/api/v1/followers/addFollow/${props.vacationId}/${currentUser.id}`
        )
        .then((response) => {
          const followId = response.data;
          const addedFollow = {
            userId: currentUser.id,
            vacationId: props.vacationId,
            followerId: followId,
          };
          dispatch(addFollow(addedFollow));
        });
    }
    //  else {
    //   axios
    //     .delete(
    //       `http://localhost:4000/api/v1/followers/unFollow/${props.vacationId}/${currentUser.id}`
    //     )
    //     .then((response) => console.log(response.data));
    // }
  };
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
      onChange={followClicked}
    >
      <FavoriteIcon />
      {followersVal}
    </ToggleButton>
  );
}
export default FollowButton;
