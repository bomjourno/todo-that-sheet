import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Typography,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";

import "./Auth.scss";

interface IFieldType {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

const cnAuth = cn("auth");

const Auth = () => {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<IFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<IFieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row className={cnAuth()}>
      <Col className={cnAuth("left")}>
        <Typography.Title className={cnAuth("left-title")}>
          Get <br /> shit <br /> <span>do</span>ne
        </Typography.Title>
      </Col>

      <Col className={cnAuth("right")}>
        <Form
          form={form}
          name={"basic"}
          className={cnAuth("right-form")}
          labelCol={{ span: 4 }}
          variant={"borderless"}
          requiredMark={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete={"off"}
        >
          <Typography.Title className={cnAuth("right-title")}>
            Login
          </Typography.Title>

          <Form.Item<IFieldType>
            name="userName"
            rules={[
              {
                required: true,
                message: isSignUp
                  ? (t("profile.errors.userName") as string)
                  : (t("profile.errors.emailOrUserName") as string),
              },
            ]}
          >
            <Input
              className={cnAuth("right-form-input")}
              placeholder={isSignUp ? "username" : "username / email"}
            />
          </Form.Item>

          <motion.div
            animate={{ height: "auto" }}
            style={{ position: "relative" }}
          >
            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <Form.Item<IFieldType>
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t("profile.errors.emailRequired") as string,
                      },
                      {
                        type: "email",
                        message: t("profile.errors.emailType") as string,
                      },
                    ]}
                  >
                    <Input
                      className={cnAuth("right-form-input")}
                      placeholder={"email"}
                    />
                  </Form.Item>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ y: 0 }} transition={{ duration: 0.3 }}>
              <Form.Item<IFieldType>
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("profile.errors.password") as string,
                  },
                ]}
              >
                <Input.Password
                  className={cnAuth("right-form-input")}
                  placeholder={"password"}
                />
              </Form.Item>
            </motion.div>

            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The new password that you entered do not match!",
                            ),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className={cnAuth("right-form-input")}
                      placeholder={"confirm password"}
                    />
                  </Form.Item>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <Form.Item<IFieldType> name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Row>
            <Form.Item>
              <Button
                className={cnAuth("right-form-submit")}
                danger
                type={"primary"}
                htmlType={"submit"}
              >
                Submit
              </Button>

              <Button
                className={cnAuth("right-form-sign-up")}
                danger
                onClick={() => {
                  form.resetFields();
                  setIsSignUp(!isSignUp);
                }}
                type={"link"}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Auth;
