import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useState } from "react";

interface BadgeProps extends TextInputProps {
  variant?: "primary" | "secondary";
  placeHolder: string;
  validationPattern?: RegExp;
  handleChange?: (text: string) => void;
}

const placeHolderColorMap: Record<"primary" | "secondary", string> = {
  primary: "#00000080",
  secondary: "#FFFFFF80",
};

export default function Input({
  variant = "primary",
  placeHolder = "",
  handleChange,
  validationPattern,
  keyboardType = "default",
  style,
  ...rest
}: BadgeProps) {
  const [value, setValue] = useState<string>("");
  const [isValid, setIsValid] = useState<Boolean>(false);

  const handleInputChange = (value: string) => {
    if (!value.trim()) return;
    setValue(value);
    if (validationPattern) {
      setIsValid(validationPattern.test(value));
    }
    if (handleChange) {
      handleChange(value);
    }
  };
  const variantStyles = {
    primary: {
      container: styles.primaryContainer,
      input: styles.primaryInput,
    },
    secondary: {
      container: styles.secondaryContainer,
      input: styles.secondaryInput,
    },
  };

  return (
    <View style={[styles.container, variantStyles[variant].container]}>
      <TextInput
        style={[styles.input, variantStyles[variant].input, style]}
        value={value}
        placeholder={placeHolder}
        placeholderTextColor={placeHolderColorMap[variant]}
        onChangeText={handleInputChange}
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
});
