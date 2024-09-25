import { FontFamilyVariant, FontWeightVariants, SizeVariants } from "@/types";
import { Text, TextProps, TextStyle } from "react-native";

const typographyStylesMap: Record<SizeVariants, TextStyle> = {
  "2xl": { fontSize: 40, lineHeight: 51.88 },
  xl: { fontSize: 28, lineHeight: 36.32 },
  lg: { fontSize: 18, lineHeight: 21.85 },
  base: { fontSize: 16, lineHeight: 19.42 },
  sm: { fontSize: 14, lineHeight: 18.16 },
  xs: { fontSize: 11, lineHeight: 13.26 },
};

const fontWeightMap: Record<FontWeightVariants, TextStyle> = {
  black: { fontWeight: 900 },
  bold: { fontWeight: 700 },
  semibold: { fontWeight: 600 },
  medium: { fontWeight: 500 },
  normal: { fontWeight: 400 },
  light: { fontWeight: 300 },
  extralight: { fontWeight: 200 },
  thin: { fontWeight: 100 },
};

const fontStyleMap: Record<string, TextStyle> = {
  normal: { fontStyle: "normal" },
  italic: { fontStyle: "italic" },
};

export const fontFamilyMap: Record<
  FontWeightVariants | "marfa",
  { regular: string; italic: string }
> = {
  black: { regular: "Suisse Int'l Black", italic: "Suisse Int'l Black Italic" },
  bold: { regular: "Suisse Int'l Black", italic: "Suisse Int'l Black Italic" },
  semibold: {
    regular: "Suisse Int'l SemiBold",
    italic: "Suisse Int'l SemiBold Italic",
  },
  medium: {
    regular: "Suisse Int'l Medium",
    italic: "Suisse Int'l Medium Italic",
  },
  normal: {
    regular: "Suisse Int'l Regular",
    italic: "Suisse Int'l Regular Italic",
  },
  light: { regular: "Suisse Int'l Light", italic: "Suisse Int'l Light Italic" },
  extralight: {
    regular: "Suisse Int'l Ultralight",
    italic: "Suisse Int'l Ultralight Italic",
  },
  thin: { regular: "Suisse Int'l Thin", italic: "Suisse Int'l Thin Italic" },
  marfa: {
    regular: "ABCMarfaVariableVF-Trial",
    italic: "ABCMarfaVariableVF-Trial",
  },
};

interface CustomTextProps extends TextProps {
  size?: SizeVariants;
  fontWeight?: FontWeightVariants;
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
    if (fontFamily === "marfa")
      return { fontFamily: fontFamilyMap["marfa"].regular };

    if (fontStyle === "italic")
      return { fontFamily: fontFamilyMap[fontWeight].italic };

    return { fontFamily: fontFamilyMap[fontWeight].regular };
  };

  return (
    <Text
      style={[
        typographyStylesMap[size],
        fontWeightMap[fontWeight],
        fontFamilyStyle(),
        fontStyleMap[fontStyle],
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
