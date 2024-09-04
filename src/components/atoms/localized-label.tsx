import React, { useEffect, useState } from 'react';
import Text, {ITextProps} from 'atoms/text';
import i18n, { currentLocale } from 'i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_LOCALE } from 'utils/constants';

export enum TextTransform {
  CAPITAL = 'capital',
  CAPITALIZE = 'capitalize',
  LOWERCASE = 'lowercase',
  UPPERCASE = 'uppercase',
  NONE = 'none',
}

export interface ILocalizedLabelProps extends ITextProps {
  localeKey: string;
  textTransform?: TextTransform;
  interpolate?: object;
  defaultValue?: string;
  textProps?: object;
}

export interface ITranslateOptions {
  locale?: string;
  interpolate?: object;
  defaultValue?: string;
}

const capitalize = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
const capital = (text: string) =>
  `${text.toLowerCase()[0].toUpperCase()}${text.slice(1)}`;
const lowercase = (text: string) => text.toLowerCase();
const uppercase = (text: string) => text.toUpperCase();

export const transformText = (
  text: string,
  textTransformation: TextTransform = TextTransform.NONE,
) => {
  switch (textTransformation) {
    case TextTransform.CAPITALIZE:
      return capitalize(text);
    case TextTransform.CAPITAL:
      return capital(text);
    case TextTransform.LOWERCASE:
      return lowercase(text);
    case TextTransform.UPPERCASE:
      return uppercase(text);
    case TextTransform.NONE:
      return text;
    default:
      return text;
  }
};

const getTranslatedText = (
  localeKey: string,
  defaultValue?: string,
  locale?: string,
  interpolate?: object,
) =>
  i18n.t(localeKey, {
    ...(defaultValue ? {defaultValue} : {}),
    ...(locale ? {locale} : {}),
    ...(interpolate ? {...interpolate} : {}),
  });

export const translate = (
  localeKey: string,
  textTransformation?: TextTransform,
  options?: ITranslateOptions,
) => {
  const {locale, defaultValue, interpolate} =
    options || ({} as ITranslateOptions);

  return transformText(
    getTranslatedText(localeKey, defaultValue, locale, interpolate),
    textTransformation,
  );
};

const LocalizedLabel = (props: ILocalizedLabelProps) => {
  const {
    localeKey,
    interpolate = undefined,
    defaultValue,
    textTransform = TextTransform.NONE,
    textProps,
  } = props;

  useEffect(() => {
    getSavedLocale();
  }, []);

  const [locale, setLocale] = useState('');

  const text = getTranslatedText(localeKey, defaultValue, locale, interpolate);
  
  const getSavedLocale = async() => {
    const savedLocale = await AsyncStorage.getItem(APP_LOCALE);
    setLocale(savedLocale || 'en');
  }

  return (
    locale?.length ? (
      <Text {...textProps} {...props}>
        {transformText(text, textTransform)}
      </Text>
    ) : (
      <></>
    )
  );
};

export default LocalizedLabel;
