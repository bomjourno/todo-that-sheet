import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import { Button, Input, MenuProps } from "antd";
import {
  Checkbox,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Row,
  Space,
  Typography,
} from "antd";
import { Dayjs } from "dayjs";
import { motion } from "framer-motion";

import { ITodoGetDto } from "shared/dto/todo";
import { TodoPriority } from "shared/enum";
import { ReactComponent as BookMarkIcon } from "assets/icons/bookmark_filled.svg";
import { ReactComponent as TrashIcon } from "assets/icons/delete.svg";
import { todoApi } from "services";

import "./Todo.scss";

interface IProps {
  todo: ITodoGetDto | null;
}

const cnTodo = cn("todo");

function* priorityToggle(): Generator<TodoPriority> {
  while (true) {
    yield TodoPriority.Middle;
    yield TodoPriority.Important;
    yield TodoPriority.Default;
  }
}

const Todo = ({ todo }: IProps) => {
  const { id, title, flagged } = todo ?? {
    title: "",
    date: "",
    flagged: false,
    priority: 100,
  };

  const { t } = useTranslation();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<TodoPriority>(TodoPriority.Default);
  const [selectedRemindOption, setSelectedRemindOption] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const priorityChanger = useRef(priorityToggle());

  const [deleteTodoApi] = todoApi.useDeleteTodoMutation();
  const [updateTodoApi] = todoApi.useUpdateTodoMutation();

  const { TextArea } = Input;

  const onConfirm = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };

  const clearDate = () => {
    setDate(null);
  };

  const updateTask = async () => {
    if (!todo) return;

    await updateTodoApi({ ...todo, flagged: !todo.flagged }).unwrap();
  };

  const deleteTask = async () => {
    if (!id) return;

    await deleteTodoApi(id).unwrap();
  };

  const remindOptions: MenuProps["items"] = [
    {
      label: <>{t("todo.remindNone")}</>,
      key: "0",
    },
    {
      label: <>{t("todo.remind10")}</>,
      key: "1",
    },
    {
      label: <>{t("todo.remind30")}</>,
      key: "2",
    },
    {
      label: <>{t("todo.remind60")}</>,
      key: "3",
    },
  ];

  return (
    <motion.div
      animate={{
        opacity: flagged ? 0.5 : 1,
      }}
      transition={{ duration: 0.5 }}
      onClick={(e) => e.stopPropagation()}
      className={cnTodo("wrapper")}
    >
      <Checkbox
        className={cnTodo({ done: flagged })}
        checked={flagged}
        disabled={!id}
        onChange={updateTask}
      >
        {!todo ? (
          <TextArea
            autoSize
            autoFocus
            placeholder={"Add task"}
            variant={"borderless"}
            className={cnTodo("input")}
          />
        ) : (
          <Typography.Paragraph className={cnTodo("title")}>
            {title}
          </Typography.Paragraph>
        )}
      </Checkbox>

      <Row className={cnTodo("actions")} align={"middle"}>
        {date && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dropdown
              menu={{
                items: remindOptions,

                onClick: (e) => {
                  const selectedOption = remindOptions.find(
                    (option) => option?.key === e.key,
                  );

                  if (selectedOption && "label" in selectedOption) {
                    setSelectedRemindOption({
                      id: selectedOption.key?.toString() ?? "",
                      label: selectedOption.label as string,
                    });
                  }
                },
              }}
              trigger={["click"]}
            >
              <Space
                className={cnTodo("btn")}
                onClick={(e) => e.preventDefault()}
              >
                {selectedRemindOption
                  ? selectedRemindOption.label
                  : t("todo.remind")}
              </Space>
            </Dropdown>
          </motion.div>
        )}

        <DatePicker
          showTime
          className={cnTodo("actions", { date: true })}
          format={"DD.MM.YY HH:mm"}
          placeholder={t("todo.setDeadline")}
          value={date}
          allowClear={false}
          onChange={(value, dateString) => {
            setDate(value);
            console.log("Selected Time: ", value);
            console.log("Formatted Selected Time: ", dateString);
          }}
          onOk={onConfirm}
          renderExtraFooter={() => (
            <Button style={{ padding: 0 }} onClick={clearDate} type="link">
              Reset
            </Button>
          )}
        />

        <Row className={cnTodo("actions", { icons: true })} align={"middle"}>
          <BookMarkIcon
            className={cnTodo("icon", {
              middle: priority === TodoPriority.Middle,
              important: priority === TodoPriority.Important,
            })}
            onClick={() => setPriority(priorityChanger.current.next().value)}
          />
          <TrashIcon className={cnTodo("icon")} onClick={deleteTask} />
        </Row>
      </Row>
    </motion.div>
  );
};

export default Todo;
