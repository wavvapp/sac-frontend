import { theme } from "@/theme"
import Svg, { Path, SvgProps } from "react-native-svg"

export default function Loader({
  width = 16,
  height = 16,
  color = theme.colors.black,
  ...rest
}: SvgProps): JSX.Element {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...rest}>
      <Path
        d="M19 10C18.9999 11.9006 18.3981 13.7524 17.2809 15.2899C16.1637 16.8275 14.5885 17.9719 12.7809 18.5592C10.9733 19.1464 9.02619 19.1464 7.21864 18.559C5.41109 17.9716 3.83588 16.8271 2.71876 15.2895C1.60165 13.7519 0.999986 11.9001 1 9.99949C1.00001 8.09891 1.60171 6.24711 2.71884 4.7095C3.83598 3.17189 5.4112 2.02741 7.21877 1.44008C9.02633 0.852744 10.9734 0.852718 12.781 1.44"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
