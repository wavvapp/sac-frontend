import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function PlusIcon({
  width = 16,
  height = 16,
  color = theme.colors.black,
  ...rest
}: SvgProps): JSX.Element {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...rest}>
      <Path
        d="M3.3335 7.99992H12.6668M8.00016 3.33325V12.6666"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
