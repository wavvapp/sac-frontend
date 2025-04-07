import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg"

export default function PenIcon(props: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G>
        <Path
          d="M14.116 4.54132C14.4685 4.18894 14.6665 3.71097 14.6666 3.21256C14.6666 2.71415 14.4687 2.23613 14.1163 1.88366C13.7639 1.53118 13.286 1.33313 12.7876 1.33307C12.2892 1.33301 11.8111 1.53094 11.4587 1.88332L2.56133 10.7827C2.40654 10.937 2.29207 11.127 2.228 11.336L1.34733 14.2373C1.3301 14.295 1.3288 14.3562 1.34356 14.4146C1.35833 14.4729 1.38861 14.5261 1.43119 14.5687C1.47378 14.6112 1.52708 14.6414 1.58544 14.656C1.64379 14.6707 1.70504 14.6693 1.76266 14.652L4.66466 13.772C4.87344 13.7085 5.06345 13.5947 5.218 13.4407L14.116 4.54132Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath>
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
