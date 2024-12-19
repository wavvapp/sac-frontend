import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

function LogoutIcon({
  width = 32,
  height = 32,
  color = theme.colors.black,
  ...rest
}: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" {...rest}>
      <Path
        fill={color}
        d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
      />
    </Svg>
  )
}

export default LogoutIcon
