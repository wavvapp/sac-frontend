import { FontWeightVariants, SizeVariants } from "@/types"
import { Text, TextProps, TextStyle } from "react-native"

const typographyStylesMap: Record<SizeVariants, TextStyle> = {
  "2xl": { fontSize: 40, lineHeight: 51.88 },
  xl: { fontSize: 28, lineHeight: 36.32 },
  lg: { fontSize: 18, lineHeight: 21.85 },
  base: { fontSize: 16, lineHeight: 19.42 },
  sm: { fontSize: 14, lineHeight: 18.16 },
  xs: { fontSize: 11, lineHeight: 13.26 },
}

const fontWeightMap: Record<FontWeightVariants, TextStyle> = {
  bold: { fontWeight: 700 },
  semibold: { fontWeight: 600 },
  medium: { fontWeight: 500 },
  normal: { fontWeight: 400 },
}

interface CustomTextProps extends TextProps {
  size?: SizeVariants
  fontWeight?: FontWeightVariants
}

export default function CustomText({
  size = "base",
  fontWeight = "normal",
  style = {},
  children,
  ...rest
}: CustomTextProps) {
  return (
    <Text
      style={[typographyStylesMap[size], fontWeightMap[fontWeight], style]}
      {...rest}>
      {children}
    </Text>
  )
}
