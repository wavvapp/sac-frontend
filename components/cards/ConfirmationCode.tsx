import { VALIDATION_PATTERNS } from "@/constants/patterns"
import { theme } from "@/theme"
import { useCallback } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

const CELL_COUNT = 6

export const ConfirmationCode = ({
  handleTextChange,
  value,
}: {
  handleTextChange: (text: string) => void
  value: string
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: handleTextChange,
  })

  const validateCodeInput = useCallback(
    (code: string) => {
      const numbericValues = code.replace(VALIDATION_PATTERNS.numericValues, "")
      handleTextChange(numbericValues)
    },
    [handleTextChange],
  )
  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        autoFocus={true}
        onChangeText={validateCodeInput}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <TextInput
            key={index}
            onChangeText={validateCodeInput}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused && <Cursor />)}
          </TextInput>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 50,
    minHeight: 35,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 8,
    fontSize: theme.fontSize.base,
    lineHeight: theme.lineHeight.base,
    borderColor: theme.colors.white_200,
    textAlign: "center",
    color: theme.colors.white,
  },
  focusCell: {
    borderColor: theme.colors.white_500,
  },
  container: {
    width: "100%",
  },
})
