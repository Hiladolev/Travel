//npm i redux, npm i @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";
import { VacationReducer } from "./VacationReducer";
import { UserReducer } from "./UserReducer";
import { FollowerReducer } from "./FollowerReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const followersPersistConfig = {
  key: "followers",
  storage,
};
const usersPersistConfig = {
  key: "users",
  storage,
};
const vacationsPersistConfig = {
  key: "vacations",
  storage,
};

const followersPersistedReducer = persistReducer(
  followersPersistConfig,
  FollowerReducer
);
const usersPersistReducer = persistReducer(usersPersistConfig, UserReducer);
const vacationsPersistReducer = persistReducer(
  vacationsPersistConfig,
  VacationReducer
);
//choose all reducers....
const reducers = {
  followers: followersPersistedReducer,
  users: usersPersistReducer,
  vacations: vacationsPersistReducer,
};

//combine reducers.
export const travel = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
});
export const persistor = persistStore(travel);

export type RootState = ReturnType<typeof travel.getState>;
