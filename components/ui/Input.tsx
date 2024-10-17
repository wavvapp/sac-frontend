import { StyleSheet, TextInput, TextInputProps, View } from "react-native"
import { InputVariant, SizeVariant } from "@/types"
import { theme } from "@/theme"

const placeHolderColorMap: Record<InputVariant, string> = {
  primary: theme.colors.black_500,
  secondary: theme.colors.white_500,
  ghost: theme.colors.black_500,
}

interface InputProps extends TextInputProps {
  variant?: InputVariant
  textSize?: SizeVariant
  handleTextChange: (text: string) => void
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
  }

  return (
    <View style={[styles.container, variantStyles?.[variant]?.container]}>
      <TextInput
        style={[variantStyles[variant].input, theme.size[textSize], style]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeHolderColorMap[variant]}
        onChangeText={handleTextChange}
        keyboardType={keyboardType}
        {...rest}
      />
    </View>
  )
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
})
