import { useEffect, useRef, useState } from "react";
import { cn } from "@bem-react/classname";
import { motion, useCycle } from "framer-motion";

import { useDimensions } from "shared/hooks/useDimensions";

import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";

import "./Menu.scss";

const cnMenu = cn("appMenu");

const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [animationEnd, setAnimationEnd] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        toggleOpen();
      }
    };

    addEventListener("mousedown", handleClickOutside);
    return () => {
      removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleOpen]);

  return (
    <motion.nav
      initial={false}
      className={cnMenu({ isClosed: !isOpen && !animationEnd })}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      onAnimationIteration={() => {
        setAnimationEnd(isOpen);
      }}
      ref={containerRef}
    >
      <Navigation />
      <MenuToggle
        toggle={() => {
          toggleOpen();
        }}
      />
    </motion.nav>
  );
};

export default Menu;
