import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import enTranslation from "./en/translation.json";
import ruTranslation from "./ru/translation.json";

void i18next.use(initReactI18next).init({
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
