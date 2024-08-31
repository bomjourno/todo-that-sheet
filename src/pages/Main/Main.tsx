import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import { Col, DatePicker, DatePickerProps, Row, Space, Typography } from "antd";
import dayjs from "dayjs";
import { changeMainDate, changeTab } from "store/reducers/AppSlice";

import { Tab } from "shared/enum";
import { useAppDispatch, useAppSelector } from "shared/hooks/redux";
import { ReactComponent as ChevronDown } from "assets/icons/chevron-down.svg";
import { ReactComponent as Menu } from "assets/icons/menu.svg";

import MainCalendar from "components/MainCalendar";
import Notes from "components/Notes";

import "./Main.scss";

const cnMain = cn("main");

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
      <Space
        className={cnMain("content-wrapper")}
        direction={"vertical"}
        size={"small"}
      >
        <Row
          className={cnMain("content")}
          align={"middle"}
          justify={"space-between"}
          wrap={false}
        >
          <Col xl={16}>
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

          <Menu className={cnMain("menu")} />
        </Row>

        <Row gutter={20}>
          <Col xl={16}>{selectedTab === Tab.Calendar && <MainCalendar />}</Col>

          <Col xl={8}>
            <Notes />
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Main;
