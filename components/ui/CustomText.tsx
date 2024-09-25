import { FontFamilyVariant, fontWeightVariants, SizeVariants } from "@/types";
import { FontStyle } from "@shopify/react-native-skia";
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
  bold: { fontWeight: "bold" },
  medium: { fontWeight: "medium" },
  normal: { fontWeight: "normal" },
};
const fontStyleMap: Record<string, TextStyle> = {
  normal: { fontStyle: "normal" },
  italic: { fontStyle: "italic" },
};

const fontFamilyMap: Record<string, { regular: string; italic: string }> = {
  black: { regular: "Suisse Int'l Black", italic: "Suisse Int'l Black Italic" },
  bold: { regular: "Suisse Int'l Black", italic: "Suisse Int'l Black Italic" },
  medium: {
    regular: "Suisse Int'l Medium",
    italic: "Suisse Int'l Medium Italic",
  },
  normal: {
    regular: "Suisse Int'l Regular",
    italic: "Suisse Int'l Regular Italic",
  },
  light: { regular: "Suisse Int'l Light", italic: "Suisse Int'l Light Italic" },
  semiBold: {
    regular: "Suisse Int'l SemiBold",
    italic: "Suisse Int'l SemiBold Italic",
  },
  thin: { regular: "Suisse Int'l Thin", italic: "Suisse Int'l Thin Italic" },
  ultraLight: {
    regular: "Suisse Int'l Ultralight",
    italic: "Suisse Int'l Ultralight Italic",
  },
  marfa: {
    regular: "ABCMarfaVariableVF-Trial",
    italic: "ABCMarfaVariableVF-Trial",
  }, // Adding Marfa font
};

interface CustomTextProps extends TextProps {
  size?: SizeVariants;
  fontWeight?: fontWeightVariants;
  fontFamily?: FontFamilyVariant;
  fontStyle?: "normal" | "italic";
}

export default function CustomText({
  size = "base",
  fontWeight = "normal",
  fontFamily = "suisse",
  fontStyle = "normal",
  style = {},
  children,
  ...rest
}: CustomTextProps) {
  const fontFamilyStyle = () => {
    if (fontFamily === "marfa") {
      return { fontFamily: fontFamilyMap["marfa"].regular };
    }
    if (fontStyle === "italic") {
      return { fontFamily: fontFamilyMap[fontWeight].italic };
    }

    return { fontFamily: fontFamilyMap[fontWeight].regular };
  };

  return (
    <Text
      style={[
        typographyStylesMap[size],
        fontWeightMap[fontWeight],
        fontFamilyStyle(),
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
