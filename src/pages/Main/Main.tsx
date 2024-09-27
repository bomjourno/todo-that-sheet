import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Row,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { changeMainDate, changeTab, setDate } from "store/reducers/AppSlice";

import { Tab } from "shared/enum";
import { useAppDispatch, useAppSelector } from "shared/hooks/redux";
import { ReactComponent as ChevronDown } from "assets/icons/chevron-down.svg";
import { todoApi } from "services";

import MainCalendar from "components/MainCalendar";
import Menu from "components/Menu";
import Notes from "components/Notes";
import Profile from "components/Profile";
import TodoList from "components/TodoList";
import TodoModal from "components/TodoModal";

import "./Main.scss";

const cnMain = cn("main");

const innerContent: Record<Tab, ReactNode> = {
  [Tab.Calendar]: <MainCalendar />,
  [Tab.AllTasks]: <TodoList />,
  [Tab.Profile]: <Profile />,
};

const variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { selectedTab, selectedDate } = useAppSelector(
    (state) => state.appReducer,
  );
  todoApi.useGetMonthTodosQuery(null);

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    const formattedDate = dayjs(date).format("MMMM YYYY");
    dispatch(changeMainDate(formattedDate));
  };

  const onChangeTab = (key: Tab) => {
    dispatch(changeTab(key));
  };

  const isVisibleTodayBtn =
    !dayjs(selectedDate).isSame(dayjs(), "month") &&
    selectedTab === Tab.Calendar;

  return (
    <div className={cnMain()}>
      <Row
        className={cnMain("header")}
        align={"middle"}
        justify={"space-between"}
      >
        <Col className={cnMain("header-left")} xl={16}>
          <Row align={"middle"} justify={"space-between"}>
            <Row align={"middle"} wrap={false}>
              <Typography.Title>
                {dayjs(selectedDate).format("MMMM YYYY")}
              </Typography.Title>
              <DatePicker
                allowClear={false}
                onChange={onChangeDate}
                suffixIcon={<ChevronDown />}
                picker="month"
              />

              <AnimatePresence mode={"wait"}>
                {isVisibleTodayBtn && (
                  <motion.div
                    key={selectedTab}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Плавная анимация
                  >
                    <Button
                      onClick={() =>
                        dispatch(setDate(dayjs().format("MMMM YYYY")))
                      }
                      type="text"
                    >
                      Today
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Row>

            <Space>
              <Typography.Text
                className={cnMain("tab", {
                  active: selectedTab === Tab.AllTasks,
                })}
                onClick={() => onChangeTab(Tab.AllTasks)}
              >
                {t("tabAllTasks")}
                {selectedTab === Tab.AllTasks && (
                  <motion.div
                    layoutId="underline"
                    className={cnMain("tab-underline")}
                  />
                )}
              </Typography.Text>

              <Typography.Text
                className={cnMain("tab", {
                  active: selectedTab === Tab.Calendar,
                })}
                onClick={() => onChangeTab(Tab.Calendar)}
              >
                {t("tabCalendar")}
                {selectedTab === Tab.Calendar && (
                  <motion.div
                    layoutId="underline"
                    className={cnMain("tab-underline")}
                  />
                )}
              </Typography.Text>
            </Space>
          </Row>
        </Col>

        <Menu />
      </Row>

      <Row className={cnMain("body")} gutter={[30, 30]}>
        <Col className={cnMain("body-left")} xl={16}>
          <AnimatePresence mode={"wait"}>
            <motion.div
              key={selectedTab}
              initial={"initial"}
              animate={"animate"}
              exit={"exit"}
              variants={variants}
              transition={{ duration: 0.1 }}
            >
              {innerContent[selectedTab]}
            </motion.div>
          </AnimatePresence>
        </Col>

        <Col xl={8}>
          <Notes />
        </Col>
      </Row>

      <TodoModal />
    </div>
  );
};

export default Main;
