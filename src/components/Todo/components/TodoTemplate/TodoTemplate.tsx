import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import { ITodoPostDto } from "shared/dto/todo";
import { TodoPriority } from "shared/enum";
import { todoApi } from "services";

import { cnTodo } from "../../helper";
import Priority from "../Priority";
import Reminder from "../Reminder";

const { TextArea } = Input;

const TodoTemplate = () => {
  const [form] = Form.useForm<ITodoPostDto>();
  const { t } = useTranslation();

  const title = Form.useWatch("title", form);
  const date = Form.useWatch("date", form);
  const priority = Form.useWatch("priority", form);
  const values = Form.useWatch([], form);

  const [createTodoApi] = todoApi.useCreateTodoMutation();

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        const postDto: ITodoPostDto = {
          date: dayjs(date).format("YYYY-MM-DD"),
          title,
          flagged: false,
          priority: priority ?? TodoPriority.Default,
          reminder: 0,
          order: 1,
        };

        createTodoApi(postDto);

        form.resetFields();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [values]);

  const onChangePriority = (priority: TodoPriority) => {
    form.setFieldsValue({ priority });
  };

  return (
    <Form form={form} className={cnTodo("wrapper", { template: true })}>
      <Row className={cnTodo("info")} align={"middle"}>
        <Form.Item
          name="title"
          noStyle
          className={cnTodo("title")}
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <TextArea
            autoSize={{ maxRows: 2 }}
            autoFocus
            placeholder={"Add task here"}
            variant={"borderless"}
          />
        </Form.Item>
      </Row>

      <Row className={cnTodo("actions")} align={"middle"}>
        <Form.Item name={"reminder"} noStyle>
          <Reminder isVisible={!!date} />
        </Form.Item>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: title ? 1 : 0,
            y: title ? 0 : -10,
          }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            visibility: title ? "visible" : "hidden",
          }}
        >
          <Form.Item
            name={"date"}
            noStyle
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <DatePicker
              showTime
              format={"DD.MM.YY HH:mm"}
              // value={dayjs(date)}
              className={cnTodo("actions", { date: true })}
              placeholder={t("todo.setDeadline")}
              allowClear={false}
              // onChange={onChangeDate}
            />
          </Form.Item>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: date && title ? 1 : 0,
            y: date && title ? 0 : -10,
          }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            visibility: date && title ? "visible" : "hidden",
          }}
        >
          <Form.Item name={"priority"} noStyle initialValue={priority}>
            <Priority value={priority} onChange={onChangePriority} />
          </Form.Item>
        </motion.div>
      </Row>
    </Form>
  );
};

export default TodoTemplate;
