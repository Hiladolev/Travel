import { ToggleButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../Redux/TravelApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { addFollow, unFollow } from "../../../../../Redux/FollowerReducer";
import { pink } from "@mui/material/colors";

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
  const buttonBackground = selected ? "pink" : "white";
  const iconBackground = selected && pink[500];
  const textColor = selected && "black";
  const count = followers.filter(
    (follower) => follower.vacationId === props.vacationId
  ).length;

  const followClicked = () => {
    if (!selected) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/v1/followers/addFollow/${props.vacationId}/${currentUser.id}`
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
          `${process.env.REACT_APP_API_URL}/api/v1/followers/unFollow/${props.vacationId}/${currentUser.id}`
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
        top: 8,
        left: 7,
        background: buttonBackground,
        textTransform: "none",
        color: textColor,
      }}
      color="primary"
      value="check"
      selected={selected}
      onChange={followClicked}
    >
      <FavoriteIcon sx={{ color: iconBackground }} />

      <div style={{ marginLeft: "7%" }}>{count}</div>
    </ToggleButton>
  );
}
export default FollowButton;
