import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function LeftArrow({
  width = 24,
  height = 24,
  color = theme.colors.black,
  ...rest
}: SvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      {...rest}>
      <Path
        d="M12 19L5 12M5 12L12 5M5 12H19"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
