import { TodoPriority } from "shared/enum";

export interface IResponseGetDto<T> {
  success: true;
  message: "Tasks found";
  responseObject: T[];
}

export interface ITodoGetDto {
  // id: number;
  // text: string;
  // isCompleted: boolean;
  // deadline: string | null;
  // priorityState: TodoPriority;
  id: string;
  owner: string;
  status: string;
  title: string;
  date: string;
  priority: number;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;
}
