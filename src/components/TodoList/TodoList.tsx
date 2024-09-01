import { useState } from "react";
import { cn } from "@bem-react/classname";
import { Reorder } from "framer-motion";

import Todo from "components/Todo";

import "./TodoList.scss";

const cnAllTasks = cn("todoList");

const mockList: {
  id: number;
  text: string;
  isCompleted: boolean;
}[] = [
  { id: 1, text: "Задача 1", isCompleted: false },
  { id: 2, text: "Задача 2", isCompleted: true },
  { id: 3, text: "Задача 3", isCompleted: false },
  { id: 4, text: "Задача 4", isCompleted: false },
  { id: 5, text: "Задача 5", isCompleted: false },
  { id: 6, text: "Задача 6", isCompleted: false },
  { id: 7, text: "Задача 7", isCompleted: false },
];

const TodoList = () => {
  const [taskList, setTaskList] = useState(mockList);

  const handleTaskCompletion = (id: number) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const sortedTasks = [...taskList].sort(
    (a, b) => (a.isCompleted ? 1 : 0) - (b.isCompleted ? 1 : 0),
  );

  return (
    <Reorder.Group
      className={cnAllTasks()}
      axis={"y"}
      values={sortedTasks}
      onReorder={setTaskList}
    >
      {sortedTasks.map((task) => (
        <Reorder.Item key={task.id} value={task}>
          <Todo
            id={task.id}
            text={task.text}
            isCompleted={task.isCompleted}
            onCompletionChange={handleTaskCompletion}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default TodoList;
