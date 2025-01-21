import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import CustomText from "@/components/ui/CustomText"
import { ButtonVariant, TypographySizeVariant } from "@/types"
import { theme } from "@/theme"

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
  textSize?: TypographySizeVariant
  title?: string
  active?: boolean
  containerStyles?: ViewStyle
  textStyles?: TextStyle
  disabled?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
  hasCenteredIcon?: boolean
}

export function CustomButton({
  variant = "default",
  onPress,
  textSize = "sm",
  textStyles = {},
  containerStyles = {},
  disabled,
  children,
  fullWidth,
  title,
  hasCenteredIcon = false,
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
    danger: {
      container: styles.danger,
      text: styles.dangerText,
    },
  }
  const { container, text } = variantStyles[variant] || variantStyles.default

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        container,
        disabled && styles.disabled,
        containerStyles,
      ]}
      disabled={disabled}
      {...rest}>
      <View
        style={[
          children && title && !hasCenteredIcon
            ? [styles.childrenContainer]
            : {},
          hasCenteredIcon && [styles.centeredIcon],
        ]}>
        {children}
      </View>
      {title && (
        <CustomText
          size={textSize}
          fontWeight="semibold"
          fontFamily="marfa"
          style={[text, styles.buttonText, textStyles]}>
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
    borderColor: theme.colors.black_200,
    backgroundColor: theme.colors.black,
  },
  buttonText: {
    letterSpacing: 0.03,
    textTransform: "uppercase",
  },
  primary: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    borderWidth: 1,
    width: 350,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 21,
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
    borderColor: theme.colors.black_200,
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  outlineText: {
    color: theme.colors.black,
  },
  destructive: {
    borderColor: theme.colors.white_200,
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
  centeredIcon: {
    paddingRight: 8,
  },
  danger: {
    paddingHorizontal: 27,
    paddingVertical: 21,
    backgroundColor: theme.colors.red,
  },
  dangerText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.semibold,
  },
})
