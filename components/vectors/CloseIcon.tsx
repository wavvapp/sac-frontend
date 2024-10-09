import { theme } from '@/theme';
import React from 'react'
import Svg, { Path, SvgProps } from "react-native-svg";

export default function CloseIcon({ width = 24, height = 24, color = theme.colors.white, ...rest }: SvgProps): JSX.Element {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
