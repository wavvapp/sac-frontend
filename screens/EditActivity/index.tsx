import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import { useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native"
interface EditActivityProps {
  closeModal: () => void
  updateEditActivityText: (newText: string) => void
}

export default function EditActivity({
  updateEditActivityText,
}: EditActivityProps) {
  const [text, setText] = useState("")

  const handleEdit = () => {
    updateEditActivityText(text)
    Keyboard.dismiss()
  }

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}>
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
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000080",
  },
  modalContainer: {
    height: "60%",
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
})
