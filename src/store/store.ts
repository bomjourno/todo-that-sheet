import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userApi } from "services";

import appReducer from "./reducers/AppSlice";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
  userReducer,
  appReducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
