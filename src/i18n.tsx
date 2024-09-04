import { I18n } from "i18n-js";
import { EN, ES } from './locales';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_LOCALE } from "utils/constants";

// CHANGE THIS TO GET THE LANGUAGE FROM THE DEVICE
export enum APP_LOCALE_KEYS {
  EN = 'en',
  ES = 'es',
}

const i18n = new I18n({
  en: EN,
  es: ES,
});

export const setLanguage = async (locale: string = APP_LOCALE_KEYS.EN) => {
  await AsyncStorage.setItem(APP_LOCALE, locale);
}

export default i18n;
