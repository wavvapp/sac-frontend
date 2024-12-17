import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function RightIcon({
  width = 32,
  height = 32,
  color = theme.colors.white,
  ...rest
}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" {...rest}>
      <Path
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.3"
        d="m10 17l5-5l-5-5"
      />
    </Svg>
  )
}
