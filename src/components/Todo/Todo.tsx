import { cn } from "@bem-react/classname";
import { Checkbox, Typography } from "antd";
import { motion } from "framer-motion";
interface IProps {
  id: number;
  text: string;
  isCompleted: boolean;
  onCompletionChange: (id: number) => void;
}

import "./Todo.scss";

const cnTodo = cn("todo");

const Todo = ({ id, text, isCompleted, onCompletionChange }: IProps) => {
  return (
    <motion.div
      animate={{
        opacity: isCompleted ? 0.5 : 1,
      }}
      transition={{ duration: 0.5 }}
    >
      <Checkbox
        className={cnTodo({ done: isCompleted })}
        checked={isCompleted}
        onChange={() => onCompletionChange(id)}
      >
        <Typography>{text}</Typography>
      </Checkbox>
    </motion.div>
  );
};

export default Todo;
