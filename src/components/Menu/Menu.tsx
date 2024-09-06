import { useRef } from "react";
import { cn } from "@bem-react/classname";
import { motion, useCycle } from "framer-motion";

import { useDimensions } from "shared/hooks/useDimensions";

import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";

import "./Menu.scss";

const cnMenu = cn("appMenu");

const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      className={cnMenu()}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default Menu;
