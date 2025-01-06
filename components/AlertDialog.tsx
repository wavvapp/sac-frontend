import { useCallback, useState } from "react"
import { Modal, View, StyleSheet, Platform } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { CustomButton } from "@/components/ui/Button"

interface AlertDialogProps {
  title: string
  description: string
  labelText?: string
  onClose?: () => void
}

export default function AlertDialog({
  title,
  description,
  labelText = "CLOSE",
  onClose,
}: AlertDialogProps) {
  const [isVisible, setIsVisible] = useState(false)

  const close = useCallback(() => {
    setIsVisible(false)
    if (onClose) onClose()
  }, [onClose])
  const open = () => setIsVisible(true)
  AlertDialog.open = open
  AlertDialog.close = close
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={close}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <CustomText style={styles.title} size="lg">
            {title}
          </CustomText>
          <CustomText style={styles.description} fontFamily="marfa">
            {description}
          </CustomText>
          <CustomButton
            variant="secondary"
            fullWidth
            containerStyles={{ width: "100%" }}
            onPress={close}
            title={labelText}
          />
        </View>
      </View>
    </Modal>
  )
}

AlertDialog.open = () => {}
AlertDialog.close = () => {}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.black_30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 24,
    alignItems: "flex-start",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: theme.fontSize.lg,
    marginBottom: 7,
    fontWeight: Platform.OS === "ios" ? "semibold" : "bold",
  },
  description: {
    marginBottom: 26,
  },
})
