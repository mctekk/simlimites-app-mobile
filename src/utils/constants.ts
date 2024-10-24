import { Dimensions } from 'react-native';

const TOUCH_PADDING = 18;
export const deviceWidth = Dimensions.get('window').width;

export const TOUCHABLE_AREA = {
  top: TOUCH_PADDING,
  bottom: TOUCH_PADDING,
  left: TOUCH_PADDING,
  right: TOUCH_PADDING,
};

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const USER_DATA = 'USER_DATA';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const USER_DATA_UPDATE = 'USER_DATA_UPDATE';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const SAVED_EMAIL = 'SAVED_EMAIL';
export const FLAG_IMAGE_NAME = 'flag.png';
export const COUNTRIES_ATTRIBUTE_NAME = 'Countries';
export const APP_LOCALE = 'APP_LOCALE';

export enum PRODUCT_TYPES_SLUGS {
  LOCAL_SLUG = 'local',
  REGIONAL_SLUG = 'regional',
  GLOBAL_SLUG = 'global',
}

export enum VARIANT_ATTRIBUTE_SLUGS {
  DURATION_SLUG = 'variant-duration',
  TYPE_SLUG = 'variant-type',
}

export enum UNREGISTERED_TYPES {
  MY_ESIMS = 'my-esims',
  PROFILE = 'profile',
}
