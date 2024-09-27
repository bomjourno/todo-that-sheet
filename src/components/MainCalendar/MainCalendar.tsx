import { useState } from "react";
import { cn } from "@bem-react/classname";
import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { setDate } from "store/reducers/AppSlice";
import { openModal } from "store/reducers/TodoSlice";

import { ITodoGetDto } from "shared/dto/todo";
import { useAppDispatch, useAppSelector } from "shared/hooks/redux";
import { todoApi } from "services";

import { Spinner } from "components/UIKit";

import "./MainCalendar.scss";

type IProps = CalendarProps<Dayjs>;

const cnMainCalendar = cn("mainCalendar");
const getListData = (value: Dayjs, todos: ITodoGetDto[] = []) => {
  return todos
    .filter((todo) => dayjs(todo.date).isSame(value, "day"))
    .map((todo) => ({
      type:
        todo.priority > 80
          ? "error"
          : todo.priority > 50
            ? "warning"
            : "success",
      content: todo.title,
    }));
};

const MainCalendar = (props: IProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const selectedDate = useAppSelector((state) => state.appReducer.selectedDate);
  const { todos, isMonthTodosLoading } = useAppSelector(
    (state) => state.todoReducer,
  );
  const [trigger] = todoApi.useLazyGetMonthTodosQuery();
  todoApi.useGetDayTodosQuery(selectedDay, {
    refetchOnMountOrArgChange: true,
    skip: !selectedDay,
  });

  const dispatch = useAppDispatch();

  const onSelectCell = (value: Dayjs) => {
    const fomattedDay = dayjs(value).format("YYYY-MM-DD");

    // is changed day
    if (
      dayjs(value).isSame(selectedDate, "month") &&
      dayjs(value).isSame(selectedDate, "year")
    ) {
      setSelectedDay(fomattedDay);
      dispatch(openModal());
    }

    // is changed month
    if (
      !dayjs(value).isSame(selectedDate, "month") ||
      !dayjs(value).isSame(selectedDate, "year")
    ) {
      trigger(fomattedDay);
    }

    dispatch(setDate(fomattedDay));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, todos);
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

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current) =>
    dateCellRender(current);

  const customHeader = () => {
    return null;
  };

  return (
    <Spinner size={"default"} spinning={isMonthTodosLoading}>
      <Calendar
        {...props}
        className={cnMainCalendar()}
        value={dayjs(selectedDate)}
        headerRender={customHeader}
        onSelect={onSelectCell}
        cellRender={cellRender}
      />
    </Spinner>
  );
};

export default MainCalendar;
