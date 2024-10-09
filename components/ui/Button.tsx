import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native"
import CustomText from "@/components/ui/CustomText"
import { ButtonVariant, SizeVariants } from "@/types"
import { theme } from "@/theme"
interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
  textSize: SizeVariants
  title: string
  active?: boolean
  containerStyles?: ViewStyle
  textStyles?: TextStyle
}
export function CustomButton({
  variant = "primary",
  onPress,
  textSize,
  textStyles = {},
  containerStyles = {},
  active,
  title,
  ...rest
}: ButtonProps): JSX.Element {
  const variantStyles = {
    primary: {
      container: styles.primary,
      text: styles.primaryVariantText,
    },
    secondary: {
      container: [styles.secondary, active && styles.secondaryActive],
      text: [
        styles.secondaryVariantText,
        active && styles.secondaryActiveVariantText,
      ],
    },
  }

  const { container, text } = variantStyles[variant] || variantStyles.primary

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[container, containerStyles]}
      {...rest}>
      <CustomText size={textSize} style={[text, textStyles]}>
        {title}
      </CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.black,
    color: theme.colors.white,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  primaryVariantText: {
    color: theme.colors.white,
    fontWeight: 500,
  },
  secondary: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.black,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  secondaryActive: {
    backgroundColor: theme.colors.black,
  },
  secondaryVariantText: {
    color: theme.colors.black,
    textTransform: "uppercase",
  },
  secondaryActiveVariantText: {
    color: theme.colors.white,
  },
})
