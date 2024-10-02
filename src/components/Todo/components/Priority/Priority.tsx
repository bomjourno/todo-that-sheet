import { useRef } from "react";

import { TodoPriority } from "shared/enum";
import { ReactComponent as BookMarkIcon } from "assets/icons/bookmark_filled.svg";

import { cnTodo } from "../../helper";

interface IProps {
  value: TodoPriority;
  onChange: (p: TodoPriority) => void;
}

function* priorityToggle(): Generator<TodoPriority> {
  while (true) {
    yield TodoPriority.Middle;
    yield TodoPriority.Important;
    yield TodoPriority.Default;
  }
}

const Priority = (props: IProps) => {
  const { value, onChange } = props;
  const priorityChanger = useRef(priorityToggle());

  const handleClick = () => {
    const newPriority = priorityChanger.current.next().value;
    onChange(newPriority);
  };

  return (
    <BookMarkIcon
      className={cnTodo("icon", {
        middle: value === TodoPriority.Middle,
        important: value === TodoPriority.Important,
      })}
      onClick={handleClick}
    />
  );
};

export default Priority;
