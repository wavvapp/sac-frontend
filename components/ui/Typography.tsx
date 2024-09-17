import { fontWeightVariants, SizeVariants } from "@/types";
import { ReactNode } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

// Define styles using StyleSheet.create with a flat structure
const styles = StyleSheet.create({
  typography2xl: {
    fontSize: 40,
    lineHeight: 51.88,
  },
  typographyXl: {
    fontSize: 28,
    lineHeight: 36.32,
  },
  typographyLg: {
    fontSize: 18,
    lineHeight: 21.85,
  },
  typographyBase: {
    fontSize: 16,
    lineHeight: 19.42,
  },
  typographySm: {
    fontSize: 14,
    lineHeight: 18.16,
  },
  typographyXs: {
    fontSize: 11,
    lineHeight: 13.26,
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
  fontWeightMedium: {
    fontWeight: "medium",
  },
  fontWeightNormal: {
    fontWeight: "normal",
  },
});

// Define types for style keys
type TypographyStyleKeys = keyof typeof styles;
type FontWeightStyleKeys = keyof typeof styles;

// Function to map size and fontWeight to style keys
const getTypographyStyle = (size: SizeVariants): TextStyle =>
  styles[
    `typography${
      size.charAt(0).toUpperCase() + size.slice(1)
    }` as TypographyStyleKeys
  ];

const getFontWeightStyle = (fontWeight: fontWeightVariants): TextStyle =>
  styles[
    `fontWeight${
      fontWeight.charAt(0).toUpperCase() + fontWeight.slice(1)
    }` as FontWeightStyleKeys
  ];

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
  const typographyStyle = getTypographyStyle(size);
  const fontWeightStyle = getFontWeightStyle(fontWeight);

  return (
    <Text style={[typographyStyle, fontWeightStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
