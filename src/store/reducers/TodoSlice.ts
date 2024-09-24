import { createSlice } from "@reduxjs/toolkit";

import { ITodoGetDto } from "shared/dto/todo";
import { todoApi } from "services";

interface IProps {
  todos: ITodoGetDto[];
  isLoading: boolean;
  modalIsOpen: boolean;
  error: string | null;
}

const initialState: IProps = {
  todos: [],
  isLoading: false,
  modalIsOpen: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todoApi.endpoints.getMonthPosts.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      },
    );
    builder.addMatcher(
      todoApi.endpoints.getMonthPosts.matchFulfilled,
      (state, { payload }) => {
        state.todos = payload.responseObject;
        state.isLoading = false;
        state.error = null;
      },
    );
    builder.addMatcher(
      todoApi.endpoints.getMonthPosts.matchRejected,
      (state, { error }) => {
        state.isLoading = false;
        state.error = error?.message ?? "Something went wrong";
      },
    );
  },
});

export const { toggleModal } = todoSlice.actions;

export default todoSlice.reducer;
