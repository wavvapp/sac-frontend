import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native"
import CheckIcon from "@/components/vectors/CheckIcon"
import PlusIcon from "@/components/vectors/PlusIcon"
import { theme } from "@/theme"

interface CheckBoxProps extends TouchableOpacityProps {
  isChecked: boolean
  onCheckedChange?: (isChecked: boolean) => void
  unshaded?: boolean
}

export default function CheckBox({
  isChecked = false,
  style = {},
  onCheckedChange,
  unshaded = false,
  ...rest
}: CheckBoxProps): JSX.Element {
  const handleCheckedChange = () => {
    onCheckedChange?.(!isChecked)
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isChecked && !unshaded && styles.checkedContainer,
        unshaded && styles.unshadedContainer,
        style,
      ]}
      onPress={handleCheckedChange}
      {...rest}>
      {isChecked ? (
        <CheckIcon
          color={unshaded ? theme.colors.black : theme.colors.white}
          height={unshaded ? 24 : 32}
          width={unshaded ? 24 : 32}
        />
      ) : (
        <PlusIcon />
      )}
    </TouchableOpacity>
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
  unshadedContainer: {
    backgroundColor: theme.colors.white,
    borderWidth: 0,
  },
})
