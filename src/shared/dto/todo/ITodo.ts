import { TodoPriority } from "shared/enum";

export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
  deadline: string | null;
  priorityState: TodoPriority;
}
