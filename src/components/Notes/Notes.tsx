import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import { Card, Typography } from "antd";
import { Input } from "antd";
import { motion } from "framer-motion";

import "./Notes.scss";

const cnNotes = cn("notes");

const Notes = () => {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={cnNotes()}>
      <Typography.Title className={cnNotes("title")} level={4}>
        {t("quickReminder")}
      </Typography.Title>

      <div className={cnNotes("cards-wrapper")} ref={ref}>
        {ref &&
          [0, 1, 2].map((index) => (
            <motion.div
              key={index}
              drag
              dragElastic={0}
              dragConstraints={ref}
              dragMomentum={false}
              transition={{ duration: 0.2 }}
              className={cnNotes("card-wrapper", {
                active: activeIndex === index,
              })}
              initial={{
                top: !index ? 0 : (index + 1) * -40,
                left: index === 1 ? -40 : "auto",
              }}
              whileDrag={{ scale: 1.02 }}
              onClick={() => setActiveIndex(index)}
            >
              <Card className={cnNotes("card")}>
                <TextArea
                  autoSize
                  placeholder={
                    !index ? "You can type something here piece of shit" : ""
                  }
                />

                <Typography.Text>Clear</Typography.Text>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Notes;
