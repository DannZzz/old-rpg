import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import translationEN from "./en/translation.json"
import translationRU from "./ru/translation.json"

export const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
}
i18next.use(initReactI18next).init({
  lng: "ru", // if you're using a language detector, do not define the lng option
  resources,
})
