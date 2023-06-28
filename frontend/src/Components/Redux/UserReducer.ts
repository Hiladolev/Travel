import Account from "../Models/Account";

//initial state
export class UsersState {
  public currentUser: Account | null = null;
  public allUsers: Account[] = [];
}

//Actions type
export enum UserActionType {
  addUser = "addAccount",
  adminLogin = "adminLogin",
  userLogin = "userLogin",
  userLogout = "userLogout",
}

//action data structure
export interface UserAction {
  type: UserActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
export const addUserAction = (newUser: Account): UserAction => {
  return { type: UserActionType.addUser, payload: newUser };
};

export const adminLoginAction = (
  firstName: string,
  lastName: string,
  role: string
): UserAction => {
  return {
    type: UserActionType.adminLogin,
    payload: { firstName, lastName, role },
  };
};
export const userLoginAction = (
  firstName: string,
  lastName: string,
  role: string,
  userId: number
): UserAction => {
  return {
    type: UserActionType.userLogin,
    payload: { firstName, lastName, role, userId },
  };
};

export const userLogoutAction = (): UserAction => {
  return { type: UserActionType.userLogout };
};

//this is the reducer function, but since it's manged only by redux, we built the function above
export function UserReducer(
  currentState: UsersState = new UsersState(),
  action: UserAction
): UsersState {
  const newState = { ...currentState };

  switch (action.type) {
    case UserActionType.addUser:
      //will give as an error - data mutation....
      newState.allUsers = [...newState.allUsers, action.payload];
      break;
    case UserActionType.adminLogin:
      newState.currentUser = action.payload;
      break;
    case UserActionType.userLogin:
      newState.currentUser = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role,
        id: action.payload.userId,
      };
      break;
    case UserActionType.userLogout:
      newState.currentUser = null;
      break;
  }

  return newState;
}
