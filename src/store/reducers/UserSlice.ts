import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "common/dto/user";

interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
