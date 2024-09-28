import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { Tab } from "shared/enum";

interface IProps {
  selectedTab: Tab;
  selectedDate: string;
  isLoading: boolean;
  error: string;
}

const getSelectedTabFromStorage = (): Tab => {
  const savedTab = localStorage.getItem("selectedTab") as Tab;

  return savedTab || Tab.Calendar;
};

const initialState: IProps = {
  selectedTab: getSelectedTabFromStorage(),
  selectedDate: dayjs().format("YYYY-MM-DD"),
  isLoading: false,
  error: "",
};

export const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    changeTab(state, action: PayloadAction<Tab>) {
      state.selectedTab = action.payload;

      localStorage.setItem("selectedTab", action.payload);
    },
    changeMainDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate, changeTab, changeMainDate } = appSlice.actions;

export default appSlice.reducer;
