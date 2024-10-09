import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function CrossMark({
  width = 24,
  height = 24,
  color = theme.colors.black,
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
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
