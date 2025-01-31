import { theme } from "@/theme"
import { ReactNode } from "react"
import {
  DimensionValue,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"

interface BottomModalProps {
  visible: boolean

  onClose: () => void
  onShow?: () => void
  children: ReactNode
  height?: DimensionValue
}

export default function BottomModal({
  visible,

  onClose,
  onShow,
  children,
  height = "60%",
}: BottomModalProps) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
      onShow={() => onShow && onShow()}
      visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View
            style={[styles.modalContainer, { height: height }]}
            onStartShouldSetResponder={() => true}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.black_500,
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
})
