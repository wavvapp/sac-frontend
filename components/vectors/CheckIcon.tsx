import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function CheckIcon({
  width = 32,
  height = 32,
  color = theme.colors.white,
  ...rest
}: SvgProps): JSX.Element {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      {...rest}>
      <Path
        d="M21.3332 12L13.9998 19.3333L10.6665 16"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
