import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import { Button, Col, Form, FormProps, Input, Typography } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import "./Profile.scss";

interface IFieldType {
  userName: string;
  email: string;
  password: string;
}

const cnProfile = cn("profile");

const Profile = () => {
  const [isSureToRemove, setSureToRemove] = useState(false);
  const { t } = useTranslation();
  const onFinish: FormProps<IFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<IFieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Col className={cnProfile()}>
      <Form
        name={"basic"}
        className={cnProfile("form")}
        labelCol={{ span: 4 }}
        variant={"borderless"}
        requiredMark={false}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete={"off"}
      >
        <Form.Item<IFieldType>
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className={cnProfile("input")} />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: t("profile.errors.emailRequired") as string,
            },
          ]}
        >
          <Input className={cnProfile("input")} />
        </Form.Item>

        <Form.Item<IFieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className={cnProfile("input")} />
        </Form.Item>
      </Form>

      <motion.div
        className={cnProfile("account-remove-wrapper")}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence>
          {!isSureToRemove ? (
            <motion.div
              key="delete"
              className={cnProfile("account-remove")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute" }}
            >
              <Typography.Text
                onClick={() => {
                  setSureToRemove(true);
                }}
              >
                Delete account
              </Typography.Text>
            </motion.div>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, position: "absolute" }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute" }}
            >
              <Typography.Text>Are you sure?</Typography.Text>
              <Button type="link" onClick={() => console.log("Confirmed!")}>
                Yes
              </Button>
              <Button
                type="link"
                onClick={() => {
                  setSureToRemove(false);
                }}
              >
                No
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Col>
  );
};

export default Profile;
