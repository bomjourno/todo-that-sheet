import { useTranslation } from "react-i18next";
import { cn } from "@bem-react/classname";
import { Card, Col, Typography } from "antd";
import { Input } from "antd";

import "./Notes.scss";

const cnNotes = cn("notes");

const Notes = () => {
  const { t } = useTranslation();
  const { TextArea } = Input;

  return (
    <div className={cnNotes()}>
      <Typography.Title className={cnNotes("title")} level={4}>
        {t("quickReminder")}
      </Typography.Title>

      <Col>
        {[0, 1, 2].map((index) => (
          <Card key={index} className={cnNotes("card")}>
            <TextArea
              autoSize
              placeholder={
                !index ? "You can type something here piece of shit" : ""
              }
            />

            <Typography.Text>Clear</Typography.Text>
          </Card>
        ))}
      </Col>
    </div>
  );
};

export default Notes;
