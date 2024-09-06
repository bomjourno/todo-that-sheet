import { cn } from "@bem-react/classname";
import { motion } from "framer-motion";

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

const itemIds = [0, 1, 2, 3, 4];

const Navigation = () => (
  <motion.ul className={cnNavigation()} variants={variants}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);

export default Navigation;
