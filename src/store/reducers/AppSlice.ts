import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { Tab } from "shared/enum";

interface IProps {
  selectedTab: Tab;
  mainDate: string;
  isLoading: boolean;
  error: string;
}

const initialState: IProps = {
  selectedTab: Tab.Calendar,
  mainDate: dayjs().format("MMMM YYYY"),
  isLoading: false,
  error: "",
};

export const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    changeTab(state, action: PayloadAction<Tab>) {
      state.selectedTab = action.payload;
    },
    changeMainDate(state, action: PayloadAction<string>) {
      state.mainDate = action.payload;
    },
  },
});

export const { changeTab, changeMainDate } = appSlice.actions;

export default appSlice.reducer;
