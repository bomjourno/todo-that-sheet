import { useEffect } from "react";
import { cn } from "@bem-react/classname";
import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { setDate } from "store/reducers/AppSlice";
import { toggleModal } from "store/reducers/TodoSlice";

import { ITodoGetDto } from "shared/dto/todo";
import { useAppDispatch, useAppSelector } from "shared/hooks/redux";
import { todoApi } from "services";

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
  const selectedDate = useAppSelector((state) => state.appReducer.selectedDate);
  const { todos } = useAppSelector((state) => state.todoReducer);

  const { refetch } = todoApi.useGetMonthPostsQuery(selectedDate);

  const dispatch = useAppDispatch();

  useEffect(() => {
    refetch();
  }, [selectedDate]);

  const onCellClick = (value: Dayjs) => {
    dispatch(setDate(value.format("MMMM YYYY")));

    if (
      dayjs(value).isSame(selectedDate, "month") &&
      dayjs(value).isSame(selectedDate, "year")
    ) {
      dispatch(toggleModal());
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, todos);
    return (
      <ul
        onClick={() => onCellClick(value)}
        className={cnMainCalendar("events")}
      >
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
    <Calendar
      {...props}
      className={cnMainCalendar()}
      value={dayjs(selectedDate)}
      headerRender={customHeader}
      cellRender={cellRender}
    />
  );
};

export default MainCalendar;
