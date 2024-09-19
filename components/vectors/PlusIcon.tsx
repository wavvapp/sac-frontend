import Svg, { Path, SvgProps } from 'react-native-svg';

const PlusIcon = ({ width = 10, height = 10 }: SvgProps): JSX.Element => (
  <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
    <Path
      d="M1.33334 6.00004H10.6667M6.00001 1.33337V10.6667"
      stroke="#898989"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;