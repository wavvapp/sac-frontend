import { theme } from "@/theme"
import {
  FontFamilyVariant,
  fontStyleVariant,
  FontWeightVariant,
  TypographySizeVariant,
} from "@/types"
import { Text, TextProps, TextStyle } from "react-native"

export interface CustomTextProps extends TextProps {
  size?: TypographySizeVariant
  fontWeight?: FontWeightVariant
  fontFamily?: FontFamilyVariant
  fontStyle?: fontStyleVariant
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
    const styleObj = style as TextStyle
    const fontWeightValue =
      (styleObj.fontWeight as FontWeightVariant) || fontWeight
    const selectedFontWeight =
      theme.fontFamily[fontFamily][fontWeightValue] ||
      theme.fontFamily[fontFamily].normal
    const selectedFontFamily =
      selectedFontWeight?.[fontStyle] || selectedFontWeight?.normal

    return { fontFamily: selectedFontFamily }
  }

  return (
    <Text
      style={[
        { fontSize: theme.fontSize[size] },
        { lineHeight: theme.lineHeight[size] },
        { fontWeight: theme.fontWeight[fontWeight] },
        { fontStyle: theme.fontStyle[fontStyle] },
        getFontFamilyStyle(),
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  )
}
