import { ReactNode } from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  GestureResponderEvent,
} from "react-native"
import { theme } from "@/theme"
import { CustomButton } from "@/components/ui/Button"

interface DatepickerBottomDrawerProps {
  isVisible: boolean
  onClose: (event?: GestureResponderEvent) => void
  title: string
  onSave: () => void
  children: ReactNode
}

const DatepickerBottomDrawer = ({
  isVisible,
  onClose,
  title,
  onSave,
  children,
}: DatepickerBottomDrawerProps) => {
  if (!isVisible) return null

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}>
        <View
          style={styles.drawer}
          onStartShouldSetResponder={() => true}
          onTouchEnd={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <CustomButton onPress={onSave} title="Save" />
          </View>
          <View>{children}</View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.black_30,
    justifyContent: "flex-end",
  },
  drawer: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily["writer-monos"].normal?.normal,
  },
})

export default DatepickerBottomDrawer
