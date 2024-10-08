import {
  FontFamilyVariant,
  fontStyleVariant,
  FontWeightVariant,
  SizeVariant,
} from "@/types";
import { Text, TextProps, TextStyle } from "react-native";

const typographyStylesMap: Record<SizeVariant, TextStyle> = {
  "2xl": { fontSize: 40, lineHeight: 51.88 },
  xl: { fontSize: 28, lineHeight: 36.32 },
  lg: { fontSize: 18, lineHeight: 21.85 },
  base: { fontSize: 16, lineHeight: 19.42 },
  sm: { fontSize: 14, lineHeight: 18.16 },
  xs: { fontSize: 11, lineHeight: 13.26 },
};

const fontWeightMap: Record<FontWeightVariant, TextStyle> = {
  black: { fontWeight: 900 },
  bold: { fontWeight: 700 },
  semibold: { fontWeight: 600 },
  medium: { fontWeight: 500 },
  normal: { fontWeight: 400 },
  light: { fontWeight: 300 },
  extralight: { fontWeight: 200 },
  thin: { fontWeight: 100 },
};

const fontStyleMap: Record<fontStyleVariant, TextStyle> = {
  normal: { fontStyle: "normal" },
  italic: { fontStyle: "italic" },
};

export const fontFamilyMap: Record<
  FontFamilyVariant,
  Partial<Record<FontWeightVariant, { normal: string; italic: string }>>
> = {
  suisse: {
    black: {
      normal: "Suisse Int'l Black",
      italic: "Suisse Int'l Black Italic",
    },
    bold: {
      normal: "Suisse Int'l Black",
      italic: "Suisse Int'l Black Italic",
    },
    semibold: {
      normal: "Suisse Int'l SemiBold",
      italic: "Suisse Int'l SemiBold Italic",
    },
    medium: {
      normal: "Suisse Int'l Medium",
      italic: "Suisse Int'l Medium Italic",
    },
    normal: {
      normal: "Suisse Int'l Regular",
      italic: "Suisse Int'l Regular Italic",
    },
    light: {
      normal: "Suisse Int'l Light",
      italic: "Suisse Int'l Light Italic",
    },
    extralight: {
      normal: "Suisse Int'l Ultralight",
      italic: "Suisse Int'l Ultralight Italic",
    },
    thin: { normal: "Suisse Int'l Thin", italic: "Suisse Int'l Thin Italic" },
  },
  "writer-mono": {
    bold: {
      normal: "iAWriterMonoS-Bold",
      italic: "iAWriterMonoS-BoldItalic",
    },
    normal: {
      normal: "iAWriterMonoS-Regular",
      italic: "iAWriterMonoS-Italic",
    },
  },
  marfa: {
    normal: {
      normal: "ABCMarfaVariable-MonoRegularItalic",
      italic: "ABCMarfaVariable-MonoRegularItalic",
    },
  },
};

interface CustomTextProps extends TextProps {
  size?: SizeVariant;
  fontWeight?: FontWeightVariant;
  fontFamily?: FontFamilyVariant;
  fontStyle?: fontStyleVariant;
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
  const getFontFamilyStyle = (): TextStyle => {
    const selectedFontWeight =
      fontFamilyMap[fontFamily][fontWeight] || fontFamilyMap[fontFamily].normal;
    const selectedFontFamily =
      selectedFontWeight?.[fontStyle] || selectedFontWeight?.normal;

    return { fontFamily: selectedFontFamily };
  };

  return (
    <Text
      style={[
        typographyStylesMap[size],
        fontWeightMap[fontWeight],
        getFontFamilyStyle(),
        fontStyleMap[fontStyle],
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
