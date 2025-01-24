import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function CheckIcon({
  width = 24,
  height = 24,
  color = theme.colors.black_200,
  ...rest
}: SvgProps): JSX.Element {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...rest}>
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        stroke-opacity="0.2"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}
