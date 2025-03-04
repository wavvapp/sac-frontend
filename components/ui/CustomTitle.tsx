import { StyleSheet, TextProps } from "react-native"
import CustomText from "@/components/ui/CustomText"

interface CustomTitleProps extends TextProps {
  text: string
  isUnderline?: boolean
}
export const CustomTitle = ({
  text,
  isUnderline = false,
  style = {},
}: CustomTitleProps) => {
  return (
    <CustomText
      fontFamily="writer-mono"
      size="sm"
      fontWeight="semibold"
      style={[style, styles.textStyles, isUnderline && styles.underLinedText]}>
      {text}
    </CustomText>
  )
}

const styles = StyleSheet.create({
  textStyles: {
    letterSpacing: 0.05,
    textTransform: "uppercase",
  },
  underLinedText: {
    textDecorationStyle: "solid",
  },
})
