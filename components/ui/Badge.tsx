import { theme } from "@/theme"
import { StyleSheet, TextStyle, View, ViewProps, ViewStyle } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { BadgeVariant } from "@/types"
interface BadgeProps extends ViewProps {
  name: string | number
  variant?: BadgeVariant
  textStyle?: TextStyle
}

export default function Badge({
  name,
  variant = "default",
  style,
  textStyle,
  ...rest
}: BadgeProps) {
  const variantStyle: Record<BadgeVariant, ViewStyle> = {
    default: styles.default,
    outline: styles.outline,
    primary: styles.primary,
  }

  const customTextStyle = {
    default: styles.defaultText,
    outline: styles.outlineText,
    primary: styles.primaryText,
  }

  return (
    <View style={[styles.container, variantStyle[variant], style]} {...rest}>
      <CustomText
        size="sm"
        style={[styles.text, customTextStyle[variant], textStyle]}
        fontFamily="writer-monov">
        {name}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    textTransform: "uppercase",
  },
  defaultText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.black,
    fontWeight: theme.fontWeight.normal,
  },
  primaryText: {
    color: theme.colors.black,
  },
  default: {
    backgroundColor: theme.colors.black,
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderColor: theme.colors.black,
    borderWidth: 1,
  },
  outline: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: theme.colors.black_200,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: theme.colors.white,
    paddingVertical: 1,
    paddingHorizontal: 8,
  },
})
