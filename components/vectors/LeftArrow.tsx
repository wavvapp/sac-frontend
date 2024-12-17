import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function LeftArrow({
  width = 32,
  height = 32,
  color = theme.colors.white,
  ...rest
}: SvgProps): JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" {...rest}>
      <Path
        fill={color}
        d="M10.707 8.707a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L8.414 13H18a1 1 0 1 0 0-2H8.414z"
      />
    </Svg>
  )
}
