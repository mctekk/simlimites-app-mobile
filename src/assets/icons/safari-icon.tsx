import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

function SafariIcon(props: SvgProps) {
  const { width = 27, height = 27, color = '#EBEBF5' } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 27 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Circle cx={13.5} cy={13.5} r={12.5} stroke={color} strokeOpacity={0.6} />
      <Path
        d='M19.494 7.5l-3.267 8.784-2.756-2.803-2.756-2.804L19.494 7.5z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M10.716 10.677L7.5 19.494l8.729-3.21'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default SafariIcon;
