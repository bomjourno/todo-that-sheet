import { useState } from "react";
import { cn } from "@bem-react/classname";
import { Reorder } from "framer-motion";

import { useAppSelector } from "shared/hooks/redux";

import Todo from "components/Todo";

import "./TodoList.scss";

const cnAllTasks = cn("todoList");

const TodoList = () => {
  const { items: todos } = useAppSelector((state) => state.todoReducer);
  const [taskList, setTaskList] = useState(todos);

  const handleTaskCompletion = (id: number) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const removeTask = (id: number) => {
    setTaskList((prevList) => prevList.filter((task) => task.id !== id));
  };

  const sortedTasks = [...taskList].sort(
    (a, b) => (a.isCompleted ? 1 : 0) - (b.isCompleted ? 1 : 0),
  );

  return (
    <Reorder.Group
      className={cnAllTasks()}
      axis={"y"}
      values={sortedTasks}
      onChange={() => {
        console.log("asdasd");
      }}
      onReorder={setTaskList}
    >
      {sortedTasks.map((task) => (
        <Reorder.Item key={task.id} value={task}>
          <Todo
            id={task.id}
            text={task.text}
            isCompleted={task.isCompleted}
            priorityState={task.priorityState}
            onCheck={handleTaskCompletion}
            deadline={task.deadline}
            removeTask={removeTask}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default TodoList;
