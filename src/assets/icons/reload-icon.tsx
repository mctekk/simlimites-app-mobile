import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from 'styles';

function ReloadIcon(props: any) {
  const { width = 19, height = 19, color = Colors.WHITE } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 20 21' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.34 5.09V.59a.5.5 0 00-1 0v3.336a9.5 9.5 0 102.953 5.097.5.5 0 00-.977.207 8.5 8.5 0 11-2.732-4.64H12.34a.5.5 0 000 1h4.5a.5.5 0 00.5-.5z'
        fill={color}
      />
    </Svg>
  );
}

export default ReloadIcon;
