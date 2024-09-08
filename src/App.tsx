import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import enLocale from "antd/locale/en_GB";
import ruLocale from "antd/locale/ru_RU";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";

import { AppNavigation } from "shared/enum";
import { theme } from "assets/styles/theme";

import { Auth, Main } from "pages";

import "dayjs/locale/ru";
import "dayjs/locale/en";
import "./i18n/config";

import "./index.scss";

dayjs.extend(updateLocale);
dayjs.extend(localeData);

const localeMap = {
  en: enLocale,
  ru: ruLocale,
};

const ProtectedRoute = () => {
  // TODO fix it
  return true ? <Outlet /> : <Navigate to={AppNavigation.Auth} />;
};

function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={theme}
        locale={localeMap[i18n.language as keyof typeof localeMap]}
      >
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path={AppNavigation.Auth} element={<Auth />} />
            <Route path={AppNavigation.Main} element={<Main />} />
          </Route>

          <Route path={AppNavigation.NotFound} element={<div>Not Found</div>} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
