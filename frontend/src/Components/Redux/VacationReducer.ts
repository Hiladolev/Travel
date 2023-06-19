import Vacation from "../Models/Vacation";

import axios from "axios";
import { travel } from "./TravelApp";
//initial state
export class VacationsState {
  public allVacations: Vacation[] = [];

  // constructor() {
  //   axios
  //     .get("http://localhost:4000/api/v1/vacations/allVacations")
  //     .then((response) => {
  //       travel.dispatch(downloadVacationsAction(response.data));
  //     });
  // }
}

//Actions type
export enum VacationActionType {
  addVacation = "addVacation",
  deleteVacation = "deleteVacation",
  updateVacation = "updateVacation",
  downloadVacations = "downloadVacations",
}

//action data structure
export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
export const addVacationAction = (newVacation: Vacation): VacationAction => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

export const deleteVacationAction = (vacationId: number): VacationAction => {
  return { type: VacationActionType.deleteVacation, payload: vacationId };
};

export const updateVacationAction = (
  updatedVacation: Vacation
): VacationAction => {
  return { type: VacationActionType.updateVacation, payload: updatedVacation };
};

export const downloadVacationsAction = (
  allVacations: Vacation[]
): VacationAction => {
  return { type: VacationActionType.downloadVacations, payload: allVacations };
};

//this is the reducer function, but since it's manged only by redux, we built the function above
export function VacationReducer(
  currentState: VacationsState = new VacationsState(),
  action: VacationAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.addVacation:
      //will give as an error - data mutation....
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.deleteVacation:
      newState.allVacations = [...newState.allVacations].filter(
        (item) => item.id !== action.payload
      );
      break;
    case VacationActionType.updateVacation:
      newState.allVacations = [...newState.allVacations].map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      break;
    case VacationActionType.downloadVacations:
      newState.allVacations = action.payload;
      break;
  }

  return newState;
}
