import { Trans, useTranslation } from "react-i18next";
import { userApi } from "api";

import "./i18n/config";

import "./index.scss";

function App() {
  const { data, isLoading } = userApi.useGetUserQuery(1);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng?: string) => {
    i18n.changeLanguage(lng);
  };

  const count = 3;

  if (isLoading) return <div>loading</div>;

  return (
    <div>
      <h1>{t("title", { name: data?.[0]?.name })}</h1>
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
