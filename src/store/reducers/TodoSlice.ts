import { createSlice } from "@reduxjs/toolkit";

import { ITodo } from "shared/dto/todo";
import { TodoPriority } from "shared/enum";

interface IProps {
  items: ITodo[];
  isLoading: boolean;
  modalIsOpen: boolean;
  error: string;
}

const initialState: IProps = {
  items: [
    {
      id: 1,
      text: "Задача 1",
      isCompleted: false,
      priorityState: TodoPriority.Default,
      deadline: "12.02.2024",
    },
    {
      id: 2,
      text: "Задача 2",
      isCompleted: true,
      deadline: "",
      priorityState: TodoPriority.Middle,
    },
    {
      id: 3,
      text: "Задача 3",
      isCompleted: false,
      deadline: null,
      priorityState: TodoPriority.Default,
    },
    {
      id: 4,
      text: "Задача 4",
      isCompleted: false,
      deadline: "",
      priorityState: TodoPriority.Default,
    },
  ],
  isLoading: false,
  modalIsOpen: false,
  error: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

export const { toggleModal } = todoSlice.actions;

export default todoSlice.reducer;
