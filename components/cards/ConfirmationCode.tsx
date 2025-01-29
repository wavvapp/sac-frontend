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
      // regex to check if the code is numeric
      const numbericValues = code.replace(/[^0-9]/g, "")
      handleTextChange(numbericValues)
    },
    [handleTextChange],
  )
  return (
    <View>
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
    width: 49,
    height: 56,
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
})
