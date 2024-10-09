import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import CustomText from "@/components/ui/CustomText";
import { ButtonVariant, SizeVariants } from "@/types";
import { theme } from "@/theme";
interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  textSize?: SizeVariants;
  title?: string;
  active?: boolean;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}
export function CustomButton({
  variant = "default",
  onPress,
  textSize,
  textStyles = {},
  containerStyles = {},
  active,
  disabled,
  children,
  fullWidth,
  title,
  ...rest
}: ButtonProps): JSX.Element {
  const getVariantStyles = (
    variant: string
  ): { container: ViewStyle; text?: TextStyle } => {
    if (variant === "primary") {
      return {
        container: styles.primary,
        text: styles.primaryText,
      };
    }
    if (variant === "secondary") {
      return {
        container: {
          ...(fullWidth && styles.secondaryFullWidth),
          ...styles.secondary,
        },
        text: styles.secondaryText,
      };
    }
    if (variant === "outline") {
      return {
        container: styles.outline,
        text: styles.outlineText,
      };
    }
    if (variant === "destructive") {
      return {
        container: styles.destructive,
        text: styles.descructiveText,
      };
    }
    if (variant === "ghost") {
      return {
        container: styles.ghost,
      };
    }
    if (variant === "default") {
      return {
        container: styles.default,
        text: styles.secondaryText,
      };
    }
    return {
      container: {},
      text: {},
    };
  };
  const { container, text } = getVariantStyles(variant);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        container,
        containerStyles,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      {variant === "ghost" && children ? (
        children
      ) : (
        <CustomText
          size={textSize}
          style={[text, textStyles, styles.buttonText]}
        >
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
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
  },
  primary: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    borderWidth: 1,
    paddingVertical: 21,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: theme.colors.black,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.3,
  },
});
