import { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

type SizeVariants = "2xl" | "xl" | "lg" | "base" | "sm" | "xs";
type fontWeightVariants = "bold" | "medium" | "normal";

const typographyStylesMap: Record<
  SizeVariants,
  { fontSize: number; lineHeight: number; color: string }
> = {
  "2xl": { fontSize: 40, lineHeight: 51.88, color: "#000000" },
  xl: { fontSize: 28, lineHeight: 36.32, color: "#000000" },
  lg: { fontSize: 18, lineHeight: 21.85, color: "#000000" },
  base: { fontSize: 16, lineHeight: 19.42, color: "#000000" },
  sm: { fontSize: 14, lineHeight: 18.16, color: "#000000" },
  xs: { fontSize: 11, lineHeight: 13.26, color: "#000000" },
};

const fontWeightMap: Record<
  fontWeightVariants,
  { fontWeight: fontWeightVariants }
> = {
  bold: { fontWeight: "bold" },
  medium: { fontWeight: "medium" },
  normal: { fontWeight: "normal" },
};

interface CustomTextProps {
  size?: SizeVariants;
  fontWeight?: fontWeightVariants;
  style?: TextStyle;
  children: ReactNode;
}

export default function CustomText({
  size = "base",
  fontWeight = "normal",
  style,
  children,
}: CustomTextProps) {
  const textStyles = typographyStylesMap[size];
  const fontWeightStyles = fontWeightMap[fontWeight];

  return <Text style={[textStyles, fontWeightStyles, style]}>{children}</Text>;
}
