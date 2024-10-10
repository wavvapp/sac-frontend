import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { InputVariant, SizeVariants } from "@/types";

const inputSizeMap: Partial<Record<SizeVariants, TextStyle>> = {
  lg: { fontSize: 20, lineHeight: 28 },
  base: { fontSize: 16, lineHeight: 24 },
  sm: { fontSize: 15, lineHeight: 28 },
};

const placeHolderColorMap: Record<InputVariant, string> = {
  primary: "#00000080",
  secondary: "#FFFFFF80",
  ghost: "#00000080",
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
        style={[
          styles.input,
          variantStyles[variant].input,
          inputSizeMap[textSize],
          style,
        ]}
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
    borderColor: "#00000033",
  },
  secondaryContainer: {
    borderColor: "#FFFFFF33",
  },
  ghostContainer: {
    borderColor: "transparent",
    paddingHorizontal: 0,
  },
  input: {
    fontSize: 15,
    lineHeight: 28,
  },
  primaryInput: {
    color: "#000000",
  },
  secondaryInput: {
    color: "#FFFFFF",
  },
  ghostInput: {
    color: "#000000",
  },
});
