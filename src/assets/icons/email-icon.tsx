import * as React from 'react';
import {SvgFromXml} from 'react-native-svg';
import {Colors} from 'styles';

const EmailIcon = (props: any) => {
  const {color = Colors.TOPIC_TEXT, width = 16, height = 16} = props;

  return (
    <SvgFromXml
      xml={`
        <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 0H2.5C1.125 0 0.0125 1.0125 0.0125 2.25L0 15.75C0 16.9875 1.125 18 2.5 18H22.5C23.875 18 25 16.9875 25 15.75V2.25C25 1.0125 23.875 0 22.5 0ZM22.5 4.5L12.5 10.125L2.5 4.5V2.25L12.5 7.875L22.5 2.25V4.5Z" fill="black"/>
        </svg>    
      `}
    />
  );
};

export default EmailIcon;
