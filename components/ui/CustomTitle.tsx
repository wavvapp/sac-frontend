import { StyleSheet } from "react-native"
import CustomText, { CustomTextProps } from "@/components/ui/CustomText"

interface CustomTitleProps extends CustomTextProps {
  text: string
  isUnderline?: boolean
}
export const CustomTitle = ({
  text,
  isUnderline = false,
  style = {},
  ...rest
}: CustomTitleProps) => {
  return (
    <CustomText
      fontFamily="writer-monov"
      size="sm"
      style={[styles.textStyles, isUnderline && styles.underLinedText, style]}
      {...rest}>
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
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
})
