import { cn } from "@bem-react/classname";
import { Spin, SpinProps } from "antd";

import "./Spinner.scss";

const cnSpinner = cn("appSpinner");

const Spinner = (props: SpinProps) => {
  return (
    <Spin
      className={cnSpinner({ isWrapper: !!props.children })}
      size={"small"}
      {...props}
    />
  );
};

export default Spinner;
