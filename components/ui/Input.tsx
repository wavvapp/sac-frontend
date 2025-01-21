import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native"
import { InputVariant, TypographySizeVariant } from "@/types"
import { theme } from "@/theme"
import { forwardRef, Ref } from "react"

const placeHolderColorMap: Record<InputVariant, string> = {
  primary: theme.colors.black_500,
  secondary: theme.colors.white_500,
  ghost: theme.colors.black_500,
}

interface InputProps extends TextInputProps {
  variant?: InputVariant
  textSize?: TypographySizeVariant
  containerStyle?: TextStyle
  handleTextChange: (text: string) => void
}

function Input(
  {
    value = "",
    variant = "primary",
    textSize = "base",
    placeholder = "",
    handleTextChange,
    keyboardType = "default",
    containerStyle = {},
    style,
    ...rest
  }: InputProps,
  ref: Ref<TextInput>,
) {
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
    <View
      style={[
        styles.container,
        variantStyles?.[variant]?.container,
        containerStyle,
      ]}>
      <TextInput
        style={[
          styles.input,
          variantStyles[variant].input,
          { fontSize: theme.fontSize[textSize] },
          { lineHeight: theme.lineHeight[textSize] },
          style,
        ]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeHolderColorMap[variant]}
        onChangeText={handleTextChange}
        keyboardType={keyboardType}
        {...rest}
        ref={ref}
      />
    </View>
  )
}

export default forwardRef(Input)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    fontFamily: theme.fontFamily.suisse.normal?.normal,
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
    fontWeight: theme.fontWeight.semibold,
  },
})
