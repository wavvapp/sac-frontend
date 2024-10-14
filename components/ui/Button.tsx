import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import CustomText, { fontFamilyMap } from "@/components/ui/CustomText"
import { ButtonVariant, SizeVariant } from "@/types"
import { theme } from "@/theme"

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
  textSize: SizeVariant
  title: string
  active?: boolean
  containerStyles?: ViewStyle
  textStyles?: TextStyle
  disabled?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
}

export function CustomButton({
  variant = "default",
  onPress,
  textSize,
  textStyles = {},
  containerStyles = {},
  disabled,
  children,
  fullWidth,
  title,
  ...rest
}: ButtonProps): JSX.Element {
  const variantStyles = {
    primary: {
      container: styles.primary,
      text: styles.primaryText,
    },
    secondary: {
      container: {
        ...(fullWidth && styles.secondaryFullWidth),
        ...styles.secondary,
      },
      text: styles.secondaryText,
    },
    outline: {
      container: styles.outline,
      text: styles.outlineText,
    },
    destructive: {
      container: styles.destructive,
      text: styles.descructiveText,
    },
    ghost: {
      container: styles.ghost,
      text: {},
    },
    default: {
      container: styles.default,
      text: styles.secondaryText,
    },
  }
  const { container, text } = variantStyles[variant] || variantStyles.default

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        container,
        containerStyles,
        disabled && styles.disabled,
      ]}
      {...rest}>
      <View style={children && title ? [styles.childrenContainer] : {}}>
        {children}
      </View>
      {title && (
        <CustomText
          size={textSize}
          style={[text, textStyles, styles.buttonText]}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    alignContent: "center",
  },
  default: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: theme.colors.black_300,
    backgroundColor: theme.colors.black,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 14,
    letterSpacing: 0.03,
    textTransform: "uppercase",
    fontFamily: fontFamilyMap["marfa"].semibold?.normal,
  },
  primary: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    borderWidth: 1,
    height: 56,
    width: 350,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: theme.colors.black,
  },
  childrenContainer: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  secondary: {
    backgroundColor: theme.colors.black,
    paddingVertical: 21,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: theme.colors.red,
  },
  secondaryFullWidth: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryText: {
    color: theme.colors.white,
  },
  outline: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.black_300,
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  outlineText: {
    color: theme.colors.black,
  },
  destructive: {
    borderColor: theme.colors.white_300,
    borderWidth: 1,
    paddingVertical: 21,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  descructiveText: {
    color: theme.colors.white,
  },
  ghost: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.3,
  },
})
