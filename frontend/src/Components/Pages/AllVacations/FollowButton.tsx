import { ToggleButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/TravelApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { addFollow, unFollow } from "../../Redux/FollowerReducer";

interface FollowProps {
  vacationId: number;
}

function FollowButton(props: FollowProps): JSX.Element {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const followers = useSelector(
    (state: RootState) => state.followers.allFollowers
  );
  const selected: boolean = followers.some(
    (follower) =>
      follower.userId === currentUser.id &&
      follower.vacationId === props.vacationId
  );

  const count = followers.filter(
    (follower) => follower.vacationId === props.vacationId
  ).length;

  const followClicked = () => {
    if (!selected) {
      axios
        .post(
          `http://localhost:4000/api/v1/followers/addFollow/${props.vacationId}/${currentUser.id}`
        )
        .then((response) => {
          const followId = response.data;
          const addedFollow = {
            followerId: followId,
            userId: currentUser.id,
            vacationId: props.vacationId,
          };
          dispatch(addFollow(addedFollow));
        });
    } else {
      axios
        .delete(
          `http://localhost:4000/api/v1/followers/unFollow/${props.vacationId}/${currentUser.id}`
        )
        .then((response) => {
          const deleteFollowerId = followers.find(
            (follower) =>
              follower.vacationId === props.vacationId &&
              follower.userId === currentUser.id
          ).followerId;
          dispatch(unFollow(deleteFollowerId));
        });
    }
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
      {count}
    </ToggleButton>
  );
}
export default FollowButton;