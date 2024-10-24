import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
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
  updateEditActivity: (newText: string) => void
}

export default function EditActivity({
  closeModal,
  updateEditActivity,
}: EditActivityProps) {
  const [text, setText] = useState("")

  const handleEdit = () => {
    if (text.trim()) {
      updateEditActivity(text.trim())
      Keyboard.dismiss()
    } else {
      closeModal()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
          onTouchStart={(e) => e.stopPropagation()}>
          <CustomText fontWeight="normal" fontFamily="suisse" size="lg">
            Status
          </CustomText>
          <Input
            textSize="lg"
            placeholder="Available"
            handleTextChange={setText}
            value={text}
            onSubmitEditing={handleEdit}
            variant="ghost"
          />
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
})
