import { cn } from "@bem-react/classname";
import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { useAppSelector } from "shared/hooks/redux";

import "./MainCalendar.scss";

type IProps = CalendarProps<Dayjs>;

const cnMainCalendar = cn("mainCalendar");
const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const MainCalendar = (props: IProps) => {
  const mainDate = useAppSelector((state) => state.appReducer.mainDate);
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={cnMainCalendar("events")}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);

    return info.originNode;
  };

  const customHeader = () => {
    return null;
  };

  return (
    <Calendar
      {...props}
      className={cnMainCalendar()}
      value={dayjs(mainDate)}
      headerRender={customHeader}
      cellRender={cellRender}
    />
  );
};

export default MainCalendar;
