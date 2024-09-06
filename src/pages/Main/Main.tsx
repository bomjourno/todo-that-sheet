import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import { Col, DatePicker, DatePickerProps, Row, Space, Typography } from "antd";
import dayjs from "dayjs";
import { changeMainDate, changeTab } from "store/reducers/AppSlice";

import { Tab } from "shared/enum";
import { useAppDispatch, useAppSelector } from "shared/hooks/redux";
import { ReactComponent as ChevronDown } from "assets/icons/chevron-down.svg";

// import { ReactComponent as Menu } from "assets/icons/menu.svg";
import MainCalendar from "components/MainCalendar";
import Menu from "components/Menu";
import Notes from "components/Notes";
import TodoList from "components/TodoList";

import "./Main.scss";

const cnMain = cn("main");

const innerContent: Record<Tab, ReactNode> = {
  [Tab.Calendar]: <MainCalendar />,
  [Tab.AllTasks]: <TodoList />,
  [Tab.DoneTasks]: <TodoList />,
};

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { selectedTab, mainDate } = useAppSelector((state) => state.appReducer);

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    const formattedDate = dayjs(date).format("MMMM YYYY");
    dispatch(changeMainDate(formattedDate));
  };

  const onChangeTab = (key: Tab) => {
    dispatch(changeTab(key));
  };

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
                {dayjs(mainDate).format("MMMM YYYY")}
              </Typography.Title>

              <DatePicker
                allowClear={false}
                onChange={onChangeDate}
                suffixIcon={<ChevronDown />}
                picker="month"
              />
            </Row>

            <Space>
              <Typography.Text
                className={cnMain("tab", {
                  active: selectedTab === Tab.AllTasks,
                })}
                onClick={() => onChangeTab(Tab.AllTasks)}
                children={t("tabAllTasks")}
              />

              <Typography.Text
                className={cnMain("tab", {
                  active: selectedTab === Tab.Calendar,
                })}
                onClick={() => onChangeTab(Tab.Calendar)}
                children={t("tabCalendar")}
              />
            </Space>
          </Row>
        </Col>

        {/*<Menu className={cnMain("menu")} />*/}
        <Menu />
      </Row>

      <Row className={cnMain("body")} gutter={[50, 50]}>
        <Col className={cnMain("body-left")} xl={16}>
          {innerContent[selectedTab]}
        </Col>

        <Col xl={8}>
          <Notes />
        </Col>
      </Row>
    </div>
  );
};

export default Main;
