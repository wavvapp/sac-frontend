import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckIconProps {
  width?: number;
  height?: number;
}

const CheckIcon: React.FC<CheckIconProps> = ({ width = 11, height = 7.5 }) => (
  <Svg width={width} height={height} viewBox="0 0 11 7.5" fill="none">
    <Path
      d="M11 1L5 6.5L2 3.5"
      stroke="#FFFFFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckIcon;