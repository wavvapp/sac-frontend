import { StyleSheet, View, StyleProp, ViewStyle } from "react-native"
import CheckIcon from "@/components/vectors/CheckIcon"
import PlusIcon from "@/components/vectors/PlusIcon"
import { theme } from "@/theme"

interface CheckBoxProps {
  isChecked: boolean
  style?: StyleProp<ViewStyle>
}

export default function CheckBox({
  isChecked = false,
  style = {},
  ...rest
}: CheckBoxProps): JSX.Element {
  return (
    <View
      style={[styles.container, isChecked && styles.checkedContainer, style]}
      {...rest}>
      {isChecked ? <CheckIcon /> : <PlusIcon />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.gray,
  },
  checkedContainer: {
    backgroundColor: theme.colors.black,
  },
})
