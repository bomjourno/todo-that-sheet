import { forwardRef, InputHTMLAttributes, LegacyRef } from "react";
import { cn } from "@bem-react/classname";
import {
  Checkbox,
  DatePicker,
  DatePickerProps,
  Input,
  InputRef,
  Row,
  TimePicker,
  Typography,
} from "antd";
import { motion } from "framer-motion";

import { ReactComponent as BookMarkIcon } from "assets/icons/bookmark_filled.svg";
import { ReactComponent as TrashIcon } from "assets/icons/delete.svg";

import "./Todo.scss";

interface IProps {
  id: number;
  text: string;
  isCompleted: boolean;
  onCompletionChange: (id: number) => void;
}

const cnTodo = cn("todo");

const Todo = ({ id, text, isCompleted, onCompletionChange }: IProps) => {
  const customInputRender = forwardRef(
    (
      props: InputHTMLAttributes<HTMLInputElement>,
      ref: LegacyRef<InputRef>,
    ) => {
      const inputProps = { ...props } as Omit<typeof props, "size">;

      return <Input {...inputProps} ref={ref} placeholder="reminder" />;
    },
  );

  const onConfirm = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };

  return (
    <motion.div
      animate={{
        opacity: isCompleted ? 0.5 : 1,
      }}
      transition={{ duration: 0.5 }}
      className={cnTodo("wrapper")}
    >
      <Checkbox
        className={cnTodo({ done: isCompleted })}
        checked={isCompleted}
        onChange={() => onCompletionChange(id)}
      >
        <Typography>{text}</Typography>
      </Checkbox>

      <Row className={cnTodo("actions")} align={"middle"}>
        <TimePicker
          className={cnTodo("actions", { time: true })}
          format={"HH:mm"}
          minuteStep={10}
          allowClear={false}
          onChange={(value) => {
            console.log(value);
          }}
          inputRender={customInputRender}
        />

        <DatePicker
          showTime
          className={cnTodo("actions", { date: true })}
          format={"DD.MM.YY HH:mm"}
          placeholder={"set deadline"}
          onChange={(value, dateString) => {
            console.log("Selected Time: ", value);
            console.log("Formatted Selected Time: ", dateString);
          }}
          onOk={onConfirm}
        />

        <Row className={cnTodo("actions", { icons: true })} align={"middle"}>
          <BookMarkIcon className={cnTodo("icon")} />
          <TrashIcon className={cnTodo("icon")} />
        </Row>
      </Row>
    </motion.div>
  );
};

export default Todo;
