import { Trans, useTranslation } from "react-i18next";

import "./i18n/config";

import "./index.scss";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng?: string) => {
    i18n.changeLanguage(lng);
  };

  const count = 3;

  return (
    <div>
      <h1>{t("title", { name: "Andrew" })}</h1>
      <p>{t("description.part2")}</p>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ru")}>Русский</button>
      <Trans i18nKey="userMessagesUnread" count={count}>
        You have {{ count }} unread message.
      </Trans>
    </div>
  );
}

export default App;
