import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { theme } from "@/theme"
import { useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

interface EditActivityProps {
  closeModal: () => void
}

export default function EditActivity({ closeModal }: EditActivityProps) {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const [text, setText] = useState(temporaryStatus.activity)

  const handleEdit = () => {
    if (text.trim()) {
      setTemporaryStatus((prev: TemporaryStatusType) => ({
        ...prev,
        activity: text.trim(),
      }))
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
              autoFocus
            />
            <CustomButton
              variant="default"
              textSize="sm"
              title="Done"
              textStyles={styles.button}
              containerStyles={{
                ...styles.buttonContainer,
                opacity: !text.trim() ? 0.3 : 1,
              }}
              onPress={handleEdit}
              disabled={!text.trim()}
            />
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
    paddingVertical: 0,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  button: {
    fontWeight: theme.fontWeight.semibold,
  },
})
