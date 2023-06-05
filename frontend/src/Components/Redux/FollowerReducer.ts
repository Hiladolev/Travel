import Follower from "../Models/Follower";

export class FollowersState {
  public allFollowers: Follower[] = [];
}

export enum FollowerActionType {
  addFollow = "addFollow",
  unFollow = "unFollow",
  downloadFollowers = "downloadFollowers",
}

export interface FollowerAction {
  type: FollowerActionType;
  payload?: any;
}

export const addFollow = (follower: Follower): FollowerAction => {
  return { type: FollowerActionType.addFollow, payload: follower };
};
export const unFollow = (followerId: number): FollowerAction => {
  return { type: FollowerActionType.unFollow, payload: followerId };
};
export const downloadFollowers = (allFollowers: Follower[]): FollowerAction => {
  return { type: FollowerActionType.downloadFollowers, payload: allFollowers };
};

export function FollowerReducer(
  currentState: FollowersState = new FollowersState(),
  action: FollowerAction
): FollowersState {
  const newState = { ...currentState };
  switch (action.type) {
    case FollowerActionType.addFollow:
      newState.allFollowers = [...newState.allFollowers, action.payload];
      break;
    case FollowerActionType.unFollow:
      newState.allFollowers = [...newState.allFollowers].filter(
        (follower) => follower.followerId
      );
      break;
    case FollowerActionType.downloadFollowers:
      newState.allFollowers = action.payload;
      break;
  }
  return newState;
}
