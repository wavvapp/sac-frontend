import { useCallback, useState } from "react"
import { Modal, View, StyleSheet, Platform } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { CustomButton } from "@/components/ui/Button"
import { AlertDialogVariant, ButtonVariant } from "@/types"

export interface AlertDialogProps {
  title?: string
  description: React.ReactNode
  cancelText?: string
  confirmText?: string
  onClose?: () => void
  onConfirm?: () => void
  variant?: AlertDialogVariant
  buttonStyles?: ButtonVariant
  closeAutomatically?: boolean
}

export default function AlertDialog(props: AlertDialogProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false)

  const [propsState, setPropsState] = useState(props)
  const {
    title,
    description,
    cancelText = "CLOSE",
    confirmText = "CONFIRM",
    onClose,
    onConfirm,
    variant = "primary",
    buttonStyles = "primary",
    closeAutomatically = true,
  } = propsState
  const close = useCallback(() => {
    setIsVisible(false)
    if (onClose) onClose()
  }, [onClose])

  const handleConfirm = useCallback(() => {
    closeAutomatically && setIsVisible(false)
    if (onConfirm) onConfirm()
  }, [closeAutomatically, onConfirm])

  const open = (props?: AlertDialogProps) => {
    if (props) setPropsState(props)
    else
      setPropsState({
        title: "No connection",
        description:
          "Make sure that you are connected to the internet and try again",
      })
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
          {title && (
            <CustomText style={styles.title} size="lg">
              {title}
            </CustomText>
          )}

          {typeof description === "string" ? (
            <CustomText style={styles.description} fontFamily="marfa">
              {description}
            </CustomText>
          ) : (
            <View style={styles.description}>{description}</View>
          )}

          {variant === "confirm" ? (
            <View style={styles.buttonContainer}>
              <CustomButton
                variant="outline"
                onPress={close}
                title={cancelText}
                containerStyles={styles.button}
              />
              <CustomButton
                variant={buttonStyles === "danger" ? "danger" : "secondary"}
                onPress={handleConfirm}
                title={confirmText}
                containerStyles={styles.button}
              />
            </View>
          ) : (
            <CustomButton
              variant="secondary"
              onPress={close}
              title={cancelText}
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
  button: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
})
