import Svg, { Defs, G, Path, ClipPath, Rect, SvgProps } from "react-native-svg"

export default function CircleCheck(props: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G>
        <Path
          d="M14.534 6.66666C14.8385 8.16086 14.6215 9.71428 13.9192 11.0679C13.217 12.4214 12.0719 13.4934 10.675 14.1049C9.2781 14.7164 7.71376 14.8305 6.24287 14.4282C4.77199 14.026 3.48347 13.1316 2.59219 11.8943C1.70091 10.657 1.26075 9.15148 1.34511 7.62892C1.42948 6.10635 2.03326 4.65872 3.05577 3.52744C4.07829 2.39616 5.45773 1.64961 6.96405 1.4123C8.47037 1.17498 10.0125 1.46123 11.3333 2.22333M6.00001 7.33333L8.00001 9.33333L14.6667 2.66666"
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
