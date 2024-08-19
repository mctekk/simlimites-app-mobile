import { Colors } from "styles";

interface ColorTheme {
  primary: string;
  background: string;
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
}
export const DEFAULT_THEME: ColorTheme = {
  primary: Colors.PRIMARY,
  background: Colors.WHITE,
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
};
