import { useCallback, useState } from "react"
import { Modal, View, StyleSheet, Platform } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { CustomButton } from "@/components/ui/Button"
import { AlertDialogVariant, ButtonVariant } from "@/types"

interface AlertDialogProps {
  title?: string
  description: React.ReactNode
  cancelText?: string
  confirmText?: string
  onClose?: () => void
  onConfirm?: () => void
  variant?: AlertDialogVariant
  buttonStyles?: ButtonVariant
}

export default function AlertDialog({
  title,
  description,
  cancelText = "CLOSE",
  confirmText = "CONFIRM",
  onClose,
  onConfirm,
  variant = "primary",
  buttonStyles = "primary",
}: AlertDialogProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false)
  const [alertBody, setAlertBody] = useState<AlertDialogProps>({
    title,
    description,
    cancelText,
    confirmText,
    onClose,
    onConfirm,
    variant,
    buttonStyles,
  })

  const close = useCallback(() => {
    setIsVisible(false)
    if (onClose) onClose()
  }, [onClose])

  const handleConfirm = useCallback(() => {
    setIsVisible(false)
    if (onConfirm) onConfirm()
  }, [onConfirm])

  const open = (body?: AlertDialogProps) => {
    if (body) setAlertBody(body)
    else {
      setAlertBody({
        title: "No connection",
        description:
          "Make sure that you are connected to the internet and try again",
        cancelText: "CLOSE",
      })
    }
    setIsVisible(true)
  }
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
          {alertBody.title && (
            <CustomText style={styles.title} size="lg">
              {alertBody.title}
            </CustomText>
          )}
          <CustomText style={styles.description} fontFamily="marfa">
            {alertBody.description}
          </CustomText>

          {alertBody.variant === "confirm" ? (
            <View style={styles.buttonContainer}>
              <CustomButton
                variant="outline"
                onPress={handleConfirm}
                title={alertBody.cancelText}
                containerStyles={styles.halfButton}
              />
              <CustomButton
                variant={
                  alertBody.buttonStyles === "danger" ? "danger" : "secondary"
                }
                onPress={close}
                title={alertBody.confirmText}
              />
            </View>
          ) : (
            <CustomButton
              variant="secondary"
              onPress={close}
              title={alertBody.cancelText}
            />
          )}
        </View>
      </View>
    </Modal>
  )
}

AlertDialog.open = (_?: AlertDialogProps) => {}
AlertDialog.close = () => {}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.black_30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
    textAlign: "center",
    fontSize: theme.fontSize.lg,
    marginBottom: 7,
    fontWeight: Platform.OS === "ios" ? "semibold" : "bold",
    maxWidth: 210,
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
