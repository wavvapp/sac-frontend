import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function CheckIcon({
  width = 11,
  height = 7.5,
  color = theme.colors.white,
  ...rest
}: SvgProps): JSX.Element {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11 7.5"
      fill="none"
      {...rest}>
      <Path
        d="M11 1L5 6.5L2 3.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
