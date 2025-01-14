import { useCallback, useState } from "react"
import { Modal, View, StyleSheet, Platform } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { CustomButton } from "@/components/ui/Button"
import { AlertDialogVariant } from "@/types"

interface AlertDialogProps {
  title: string
  description: string
  labelText?: string
  confirmText?: string
  onClose?: () => void
  onConfirm?: () => void
  variant?: AlertDialogVariant
}

export default function AlertDialog({
  title,
  description,
  labelText = "CLOSE",
  confirmText = "CONFIRM",
  onClose,
  onConfirm,
  variant = "primary",
}: AlertDialogProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false)

  const close = useCallback(() => {
    setIsVisible(false)
    if (onClose) onClose()
  }, [onClose])

  const handleConfirm = useCallback(() => {
    setIsVisible(false)
    if (onConfirm) onConfirm()
  }, [onConfirm])

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

          {variant === "confirm" ? (
            <View style={styles.buttonContainer}>
              <CustomButton
                variant="outline"
                onPress={handleConfirm}
                title={confirmText}
                containerStyles={styles.halfButton}
              />
              <CustomButton
                variant="secondary"
                onPress={close}
                title={labelText}
                containerStyles={styles.halfButton}
              />
            </View>
          ) : (
            <CustomButton
              variant="secondary"
              onPress={close}
              title={labelText}
            />
          )}
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
    alignItems: "center",
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
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 12,
  },
  halfButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
})
