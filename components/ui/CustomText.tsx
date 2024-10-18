import { theme } from "@/theme"
import {
  FontFamilyVariant,
  fontStyleVariant,
  FontWeightVariant,
  SizeVariant,
} from "@/types"
import { Text, TextProps, TextStyle } from "react-native"

interface CustomTextProps extends TextProps {
  size?: SizeVariant
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
  const getFontWeight = () => ({ fontWeight: theme.fontWeight[fontWeight] })
  const getFontStyle = () => ({
    fontStyle: theme.fontStyle[fontStyle],
  })

  return (
    <Text
      style={[
        theme.size[size],
        getFontWeight(),
        getFontFamilyStyle(),
        getFontStyle(),
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  )
}
