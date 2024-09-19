import { theme } from '@/theme';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function PlusIcon({ width = 10, height = 10, color = theme.colors['light-gray'], ...rest }: SvgProps): JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none" {...rest}>
      <Path
        d="M1.33334 6.00004H10.6667M6.00001 1.33337V10.6667"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
};
