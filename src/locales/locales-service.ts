import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_LOCALE } from 'utils/constants';

class LocalesService {
  private static currentLocale: any;

  public static async setCurrentLocale() {
    let currentLocale = await AsyncStorage.getItem(APP_LOCALE);
    this.currentLocale = currentLocale;
  }

  public static getCurrentLocale() {
    return this.currentLocale;
  }
}

export default LocalesService;
