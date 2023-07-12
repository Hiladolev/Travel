import FollowButton from "../../FollowButton";

interface UserCardControlsProps {
  id: number;
}
export function UserCardControls({ id }: UserCardControlsProps): JSX.Element {
  return <FollowButton vacationId={id} />;
}
