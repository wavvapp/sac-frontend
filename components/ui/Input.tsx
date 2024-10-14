import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { InputVariant, SizeVariant } from "@/types";
import { theme } from "@/theme";

const inputSizeMap: Partial<Record<SizeVariant, TextStyle>> = {
  sm: { fontSize: 13, lineHeight: 20 },
  base: { fontSize: 15, lineHeight: 24 },
  lg: { fontSize: 20, lineHeight: 28 },
};

const placeHolderColorMap: Record<InputVariant, string> = {
  primary: theme.colors.black_500,
  secondary: theme.colors.white_500,
  ghost: theme.colors.black_500,
};

interface InputProps extends TextInputProps {
  variant?: InputVariant;
  textSize?: "lg" | "base" | "sm";
  handleTextChange: (text: string) => void;
}

export default function Input({
  value = "",
  variant = "primary",
  textSize = "base",
  placeholder = "",
  handleTextChange,
  keyboardType = "default",
  style,
  ...rest
}: InputProps) {
  const variantStyles = {
    primary: {
      container: styles.primaryContainer,
      input: styles.primaryInput,
    },
    secondary: {
      container: styles.secondaryContainer,
      input: styles.secondaryInput,
    },
    ghost: {
      container: styles.ghostContainer,
      input: styles.ghostInput,
    },
  };

  return (
    <View style={[styles.container, variantStyles?.[variant]?.container]}>
      <TextInput
        style={[variantStyles[variant].input, inputSizeMap[textSize], style]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeHolderColorMap[variant]}
        onChangeText={handleTextChange}
        keyboardType={keyboardType}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 5,
  },
  primaryContainer: {
    borderColor: theme.colors.black_200,
  },
  secondaryContainer: {
    borderColor: theme.colors.white_200,
  },
  ghostContainer: {
    borderColor: "transparent",
    paddingHorizontal: 0,
  },
  primaryInput: {
    color: theme.colors.black,
  },
  secondaryInput: {
    color: theme.colors.white,
  },
  ghostInput: {
    color: theme.colors.black,
  },
});
