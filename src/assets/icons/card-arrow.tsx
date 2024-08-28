import * as React from 'react';
import { SvgFromXml } from 'react-native-svg';
import { Colors } from 'styles';

const CardArrow = (props: any) => {
  const {
    color = Colors.BLACK,
    width = 12,
    height = 12,
  } = props;
  return (
    <SvgFromXml
      xml={`
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.266515 10.1611L3.80182 5.99463L0.266515 1.82819C-0.0888383 1.4094 -0.0888383 0.732886 0.266515 0.314094C0.621868 -0.104698 1.1959 -0.104698 1.55125 0.314094L5.73349 5.24295C6.08884 5.66175 6.08884 6.33826 5.73349 6.75705L1.55125 11.6859C1.1959 12.1047 0.621868 12.1047 0.266515 11.6859C-0.0797267 11.2671 -0.0888383 10.5799 0.266515 10.1611Z" fill="#565656"/>
        </svg>
      `}
    />
  );
};

export default CardArrow;
