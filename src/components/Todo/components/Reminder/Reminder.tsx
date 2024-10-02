import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, MenuProps, Space } from "antd";
import { motion } from "framer-motion";

import { cnTodo } from "../../helper";

interface IProps {
  isVisible: boolean;
}

const Reminder = ({ isVisible }: IProps) => {
  const { t } = useTranslation();

  const [selectedRemindOption, setSelectedRemindOption] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const remindOptions: MenuProps["items"] = [
    {
      label: <>{t("todo.remindNone")}</>,
      key: "0",
    },
    {
      label: <>{t("todo.remind10")}</>,
      key: "1",
    },
    {
      label: <>{t("todo.remind30")}</>,
      key: "2",
    },
    {
      label: <>{t("todo.remind60")}</>,
      key: "3",
    },
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Dropdown
        menu={{
          items: remindOptions,

          onClick: (e) => {
            const selectedOption = remindOptions.find(
              (option) => option?.key === e.key,
            );

            if (selectedOption && "label" in selectedOption) {
              setSelectedRemindOption({
                id: selectedOption.key?.toString() ?? "",
                label: selectedOption.label as string,
              });
            }
          },
        }}
        trigger={["click"]}
      >
        <Space className={cnTodo("btn")} onClick={(e) => e.preventDefault()}>
          {selectedRemindOption ? selectedRemindOption.label : t("todo.remind")}
        </Space>
      </Dropdown>
    </motion.div>
  );
};

export default Reminder;
