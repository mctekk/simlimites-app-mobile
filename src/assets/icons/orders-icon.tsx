import * as React from 'react';
import { SvgFromXml } from 'react-native-svg';
import { Colors } from 'styles';

const OrdersIcon = (props: any) => {
  const { color = Colors.BLACK, size = 18 } = props;
  return (
    <SvgFromXml
      xml={`
        <svg width=${size} height=${size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.3636 0H1.63636C0.736364 0 0 0.81 0 1.8V16.2C0 17.19 0.736364 18 1.63636 18H16.3636C17.2636 18 18 17.19 18 16.2V1.8C18 0.81 17.2636 0 16.3636 0ZM16.3636 4.5H1.63636V1.8H16.3636V4.5Z" fill=${color}/>
        </svg>
      `}
    />
  );
};

export default OrdersIcon;
