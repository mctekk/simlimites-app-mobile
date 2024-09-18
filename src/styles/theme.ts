import { Colors } from "styles";

interface ColorTheme {
  primary: string;
  background: string;
  authBackground: string;
  transparent: string;
  text: string;
  borderColor: string;
  error: string;
  placeHolderText: string;
  black: string;
  white: string;
  secondaryButton: string;
  subtitle: string;
  inputLabel: string;
  separatorText: string;
  disabledButton: string;
  title: string;
  inputBg: string;
  tabIconActive: string;
  tabIconInactive: string;
  tabsBg: string;
  addFundsBg: string;
  variantSubtitle: string;
  disabledSearch: string;
  cardBg: string;
  simCardInfo: string;
  disabledPrimary: string;
}
export const DEFAULT_THEME: ColorTheme = {
  primary: Colors.LIGHT_BLUE,
  background: Colors.MAIN_BG,
  authBackground: Colors.WHITE,
  text: Colors.SOFT_BLACK,
  borderColor: Colors.BORDER_COLOR,
  error: Colors.ERROR_RED,
  transparent: Colors.TRANSPARENT,
  placeHolderText: Colors.PLACEHOLDER_TEXT,
  black: Colors.BLACK,
  white: Colors.WHITE,
  secondaryButton: Colors.LIGHT_GRAY,
  subtitle: Colors.SUBTITLE_COLOR,
  inputLabel: Colors.LABEL_GRAY,
  separatorText: Colors.GRAY,
  disabledButton: Colors.DISABLED_GRAY,
  disabledPrimary: Colors.DISABLED_BLUE,
  title: Colors.BLACK,
  inputBg: Colors.WHITE,
  tabIconActive: Colors.BLACK,
  tabIconInactive: Colors.PLACEHOLDER_TEXT,
  tabsBg: Colors.TABS_BG,
  addFundsBg: Colors.LIGHT_BLUE,
  variantSubtitle: Colors.LIGHT_BLACK,
  disabledSearch: Colors.LIGHT_GRAY,
  cardBg: Colors.CARD_GRAY,
  simCardInfo: Colors.GRAY,
};
