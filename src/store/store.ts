import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userApi } from "services";
import { todoApi } from "services";

import appReducer from "./reducers/AppSlice";
import todoReducer from "./reducers/TodoSlice";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
  userReducer,
  appReducer,
  todoReducer,
  [userApi.reducerPath]: userApi.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware, todoApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
