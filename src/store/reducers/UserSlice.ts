import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "shared/dto/user";

interface IProps {
  user: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: IProps = {
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
