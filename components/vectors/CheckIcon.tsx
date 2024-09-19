import Svg, { Path, SvgProps } from 'react-native-svg';

const CheckIcon = ({ width = 11, height = 7.5 }: SvgProps): JSX.Element => (
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