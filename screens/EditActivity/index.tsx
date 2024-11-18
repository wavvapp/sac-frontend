import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import CheckIcon from "@/components/vectors/CheckIcon"
import { useStatus } from "@/contexts/StatusContext"
import { theme } from "@/theme"
import { useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"

interface EditActivityProps {
  closeModal: () => void
}

export default function EditActivity({ closeModal }: EditActivityProps) {
  const { setStatusMessage, statusMessage } = useStatus()
  const [text, setText] = useState(statusMessage)

  const handleEdit = () => {
    if (text.trim()) {
      setStatusMessage(text.trim())
      Keyboard.dismiss()
    }
    closeModal()
  }

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
          onStartShouldSetResponder={() => true}>
          <CustomText fontWeight="normal" fontFamily="suisse" size="lg">
            Status
          </CustomText>
          <View style={styles.formContainer}>
            <Input
              textSize="lg"
              placeholder="Status message"
              handleTextChange={setText}
              value={text}
              onSubmitEditing={handleEdit}
              variant="ghost"
              containerStyle={styles.inputContainer}
              multiline
            />
            <CustomButton
              disabled={!text.trim()}
              style={styles.button}
              onPress={handleEdit}>
              <CheckIcon
                color={theme.colors.black}
                width={50}
                height={50}
                opacity={!text.trim() ? 0.3 : 1}
              />
            </CustomButton>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.black_500,
  },
  modalContainer: {
    height: "60%",
    backgroundColor: theme.colors.white,
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    borderRadius: 100,
    padding: 12,
  },
})
