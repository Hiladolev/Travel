//npm i redux, npm i @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";
import { VacationReducer } from "./VacationReducer";
import { UserReducer } from "./UserReducer";

//choose all reducers....
const reducers = { vacations: VacationReducer, users: UserReducer };

//combine reducers.
export const travel = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
