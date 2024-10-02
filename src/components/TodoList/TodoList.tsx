import { useEffect, useState } from "react";
import { cn } from "@bem-react/classname";
import { Reorder } from "framer-motion";

import { ITodoGetDto } from "shared/dto/todo";
import { useAppSelector } from "shared/hooks/redux";

import Todo from "components/Todo";
import { Spinner } from "components/UIKit";

import "./TodoList.scss";

const cnTodoList = cn("todoList");

const TodoList = () => {
  const {
    todos,
    dayTodos,
    isDayTodosShown,
    isMonthTodosLoading,
    isDayTodosLoading,
  } = useAppSelector((state) => state.todoReducer);
  const [todoList, setTodoList] = useState<ITodoGetDto[]>([]);

  useEffect(() => {
    setTodoList(isDayTodosShown ? dayTodos : todos);
  }, [todos, dayTodos, isDayTodosShown]);

  return (
    <Reorder.Group
      className={cnTodoList()}
      axis={"y"}
      values={todoList}
      onReorder={setTodoList}
    >
      <Spinner spinning={isMonthTodosLoading || isDayTodosLoading}>
        <Todo isTemplate todo={{} as ITodoGetDto} />
        {todoList.map((todo) => (
          <Reorder.Item key={todo.id} value={todo}>
            <Todo todo={todo} />
          </Reorder.Item>
        ))}
      </Spinner>
    </Reorder.Group>
  );
};

export default TodoList;
