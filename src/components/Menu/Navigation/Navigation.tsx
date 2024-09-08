import { cn } from "@bem-react/classname";
import { motion } from "framer-motion";
import { changeTab } from "store/reducers/AppSlice";

import { Tab } from "shared/enum";
import { useAppDispatch } from "shared/hooks/redux";

import MenuItem from "../MenuItem";

import "./Navigation.scss";

const cnNavigation = cn("navigation");

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = () => {
  const dispatch = useAppDispatch();

  const onChangeTab = (key: Tab) => {
    dispatch(changeTab(key));
  };

  return (
    <motion.ul className={cnNavigation()} variants={variants}>
      <MenuItem onClick={() => onChangeTab(Tab.Profile)} text={"Profile"} />
      <MenuItem onClick={() => onChangeTab(Tab.Calendar)} text={"Calendar"} />
      <MenuItem onClick={() => onChangeTab(Tab.AllTasks)} text={"All Tasks"} />
    </motion.ul>
  );
};

export default Navigation;
