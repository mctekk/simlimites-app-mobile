import * as React from 'react';
import {SvgFromXml} from 'react-native-svg';
import { DEFAULT_THEME } from 'styles/theme';

const BackArrow = (props: any) => {
  const {
    color = DEFAULT_THEME.black,
  } = props;

  return (
    <SvgFromXml
      xml={`
        <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19.415L4.583 11L12 2.585L9.7166 0L0 11L9.7166 22L12 19.415Z" fill=${color}/>
        </svg>
      `}
    />
  );
};

export default BackArrow;
