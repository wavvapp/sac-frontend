import { Modal, View, StyleSheet, Platform } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { CustomButton } from "./ui/Button"

interface AlertDialogProps {
  isOpen: boolean
  title: string
  description: string
  cancelLabelText?: string
  onClose: () => void
}

export default function AlertDialog({
  isOpen,
  title,
  description,
  cancelLabelText = "CLOSE",
  onClose,
}: AlertDialogProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={onClose}>
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
              onPress={onClose}
              title={cancelLabelText}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.black_250,
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
