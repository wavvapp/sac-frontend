import { fontWeightVariants, SizeVariants } from "@/types";
import { Text, TextProps, TextStyle } from "react-native";

const typographyStylesMap: Record<SizeVariants, TextStyle> = {
  "2xl": { fontSize: 40, lineHeight: 51.88 },
  xl: { fontSize: 28, lineHeight: 36.32 },
  lg: { fontSize: 18, lineHeight: 21.85 },
  base: { fontSize: 16, lineHeight: 19.42 },
  sm: { fontSize: 14, lineHeight: 18.16 },
  xs: { fontSize: 11, lineHeight: 13.26 },
};

const fontWeightMap: Record<fontWeightVariants, TextStyle> = {
  bold: { fontWeight: "500" },
  medium: { fontWeight: "medium" },
  normal: { fontWeight: "normal" },
};

interface CustomTextProps extends TextProps {
  size?: SizeVariants;
  fontWeight?: fontWeightVariants;
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
      {...rest}
    >
      {children}
    </Text>
  );
}
