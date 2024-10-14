import { theme } from "@/theme"
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native"
import CustomText from "@/components/ui/CustomText"
type BadgeVariants = "default" | "outline" | "primary"
interface BadgeProps extends ViewProps {
  name: string | number
  variant?: BadgeVariants
}

export default function Badge({
  name,
  variant = "default",
  style,
  ...rest
}: BadgeProps) {
  const variantStyle: Record<BadgeVariants, ViewStyle> = {
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
    primary: {
      backgroundColor: theme.colors.white,
      paddingVertical: 1,
      paddingHorizontal: 8,
    },
  }

  let customTextStyle
  switch (variant) {
    case "outline":
      customTextStyle = styles.outlineText
      break
    case "primary":
      customTextStyle = styles.primaryText
      break
    default:
      customTextStyle = styles.defaultText
  }

  return (
    <View style={[styles.container, variantStyle[variant], style]} {...rest}>
      <CustomText size="xs" style={[styles.text, customTextStyle]}>
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
    fontWeight: 700,
  },
  outlineText: {
    color: theme.colors.black,
    fontWeight: 400,
  },
  primaryText: {
    color: theme.colors.black,
    fontWeight: 700,
    lineHeight: 14,
    fontSize: 13,
  },
})
