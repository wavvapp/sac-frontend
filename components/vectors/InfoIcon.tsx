import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function InfoIcon({
  width = 16,
  height = 16,
  color = theme.colors.black,
  ...rest
}: SvgProps): JSX.Element {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      {...rest}>
      <Path
        d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
