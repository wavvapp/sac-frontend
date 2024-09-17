import { ReactNode, useMemo } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type SizeVariants = "2xl" | "xl" | "lg" | "base" | "sm" | "xs";
type fontWeightVariants = "bold" | "medium" | "normal";

const typographyStylesMap: Record<
  SizeVariants,
  { fontSize: number; lineHeight: number }
> = {
  "2xl": { fontSize: 40, lineHeight: 51.88 },
  xl: { fontSize: 28, lineHeight: 36.32 },
  lg: { fontSize: 18, lineHeight: 21.85 },
  base: { fontSize: 16, lineHeight: 19.42 },
  sm: { fontSize: 14, lineHeight: 18.16 },
  xs: { fontSize: 11, lineHeight: 13.26 },
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
  style = {},
  children,
}: CustomTextProps) {
  const textStyles = useMemo(
    () =>
      StyleSheet.create({
        typography: {
          ...typographyStylesMap[size],
          ...fontWeightMap[fontWeight],
        },
      }),
    [size, fontWeight]
  );

  return <Text style={[textStyles.typography, style]}>{children}</Text>;
}
