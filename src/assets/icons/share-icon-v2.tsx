import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ShareIconV2(props: SvgProps) {
  const { width = 33, height = 33, color = '#C4C4C4' } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 31 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Path fill={color} fillOpacity={0.01} d='M.667 0h30v30h-30z' />

      <Path
        d='M15.666 17.143V4.286m0 0L11.38 8.242m4.286-3.956l4.286 3.956M6.023 13.928v10.715h19.048V13.928'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default ShareIconV2;
