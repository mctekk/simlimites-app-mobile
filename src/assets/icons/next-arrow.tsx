import * as React from 'react';
import { SvgFromXml } from 'react-native-svg';
import { Colors } from 'styles';

const NextArrow = (props: any) => {
  const {
    color = Colors.WHITE,
    width = 12,
    height = 12,
  } = props;
  return (
    <SvgFromXml
      xml={`
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 0L7.82563 1.7625L14.4519 8.75H0V11.25H14.4519L7.82563 18.2375L9.5 20L19 10L9.5 0Z" fill=${color}/>
        </svg>
      `}
    />
  );
};

export default NextArrow;
