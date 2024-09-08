import { cn } from "@bem-react/classname";
import { motion } from "framer-motion";

import "./MenuItem.scss";

const cnMenuItem = cn("menuItem");

interface IProps {
  text: string;
  onClick: VoidFunction;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 10,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ text, onClick }: IProps) => {
  return (
    <motion.li
      variants={variants}
      onClick={onClick}
      className={cnMenuItem()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
    >
      {text}
    </motion.li>
  );
};

export default MenuItem;
