import { createSlice } from "@reduxjs/toolkit";

import { ITodoGetDto } from "shared/dto/todo";
import { todoApi } from "services";

interface IProps {
  todos: ITodoGetDto[];
  dayTodos: ITodoGetDto[];
  isDayTodosShown: boolean;
  isMonthTodosLoading: boolean;
  isDayTodosLoading: boolean;
  modalIsOpen: boolean;
  error: string | null;
}

const initialState: IProps = {
  todos: [],
  dayTodos: [],
  isDayTodosShown: false,
  isMonthTodosLoading: false,
  isDayTodosLoading: false,
  modalIsOpen: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true;

      state.isDayTodosShown = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;

      state.isDayTodosShown = false;
    },
  },
  extraReducers: (builder) => {
    // get all todos
    builder.addMatcher(
      todoApi.endpoints.getMonthTodos.matchPending,
      (state) => {
        state.isMonthTodosLoading = true;
        state.error = null;
      },
    );
    builder.addMatcher(
      todoApi.endpoints.getMonthTodos.matchFulfilled,
      (state, { payload }) => {
        state.todos = payload.responseObject.sort(
          (a, b) => (a.flagged ? 1 : 0) - (b.flagged ? 1 : 0),
        );
        state.isMonthTodosLoading = false;
        state.error = null;
      },
    );
    builder.addMatcher(
      todoApi.endpoints.getMonthTodos.matchRejected,
      (state, { error }) => {
        state.isMonthTodosLoading = false;
        state.error = error?.message ?? "Something went wrong";
      },
    );

    // get day todos
    builder.addMatcher(todoApi.endpoints.getDayTodos.matchPending, (state) => {
      state.isDayTodosLoading = true;
      state.error = null;
    });
    builder.addMatcher(
      todoApi.endpoints.getDayTodos.matchFulfilled,
      (state, { payload }) => {
        state.dayTodos = payload.responseObject;
        state.isDayTodosLoading = false;
        state.error = null;
      },
    );
    builder.addMatcher(
      todoApi.endpoints.getDayTodos.matchRejected,
      (state, { error }) => {
        state.isDayTodosLoading = false;
        state.error = error?.message ?? "Something went wrong";
      },
    );
  },
});

export const { openModal, closeModal } = todoSlice.actions;

export default todoSlice.reducer;
