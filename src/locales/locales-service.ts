import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_LOCALE } from 'utils/constants';
import { APP_LOCALE_KEYS } from 'i18n';

class LocalesService {
  private static currentLocale: any;

  public static async loadCurrentLocale() {
    let currentLocale = await AsyncStorage.getItem(APP_LOCALE);
    this.currentLocale = currentLocale || APP_LOCALE_KEYS.ES;
  }

  public static getCurrentLocale() {
    return this.currentLocale;
  }
}

export default LocalesService;
