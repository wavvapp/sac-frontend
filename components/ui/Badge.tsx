import { theme } from "@/theme"
import { StyleSheet, View, ViewProps } from "react-native"
import CustomText from "@/components/ui/CustomText"

interface BadgeProps extends ViewProps {
  name: string | number
  variant?: "default" | "outline"
}

export default function Badge({
  name,
  variant = "default",
  style,
  ...rest
}: BadgeProps) {
  const variantStyle = variant === "outline" ? styles.outline : styles.default
  const customTextStyle =
    variant === "outline" ? styles.outlineText : styles.defaultText
  return (
    <View {...rest} style={[styles.container, variantStyle, style]}>
      <CustomText
        size="xs"
        fontWeight={variant === "outline" ? "normal" : "bold"}
        fontFamily="writer-mono"
        style={[styles.text, customTextStyle]}>
        {name}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
  text: {
    textTransform: "uppercase",
  },
  defaultText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.black,
  },
  default: {
    backgroundColor: theme.colors.black,
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  outline: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: theme.colors.black,
    borderWidth: 1,
  },
})
