
import Account from '../Models/Account';

//initial state
export class UsersState {
    public allUsers: Account[] = [];
}

//Actions type
export enum UserActionType {
    addUser = "addUser",
    deleteUser = "deleteUser",
    downloadUsers = "downloadUsers",
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

  export const deleteUserAction = (userId: number): UserAction => {
    return { type: UserActionType.deleteUser, payload: userId };
  }; 

  export const downloadUsersAction = (allUsers: Account[]): UserAction => {
    return { type: UserActionType.downloadUsers, payload: allUsers };
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
      newState.allUsers = [...newState.allUsers,action.payload]
        break;
      case UserActionType.deleteUser:
newState.allUsers = [...newState.allUsers].filter((item)=> item.id!== action.payload)
        break;

      case UserActionType.downloadUsers:
        newState.allUsers = action.payload;
        break;
    }
  
    return newState;
  }