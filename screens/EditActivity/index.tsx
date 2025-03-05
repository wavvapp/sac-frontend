import { CustomButton } from "@/components/ui/Button"
import { CustomTitle } from "@/components/ui/CustomTitle"
import Input from "@/components/ui/Input"
import { theme } from "@/theme"
import { Ref, useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native"

interface EditActivityProps {
  title: string
  placeholderText: string
  initialInputValue: string
  buttonText: string
  onPress: (text: string) => void
  closeModal: () => void
  inputRef: Ref<TextInput>
  multiLineInput?: boolean
}

export default function EditActivity({
  closeModal,
  title,
  placeholderText,
  initialInputValue,
  buttonText,
  onPress,
  inputRef,
  multiLineInput = true,
}: EditActivityProps) {
  const [text, setText] = useState(initialInputValue)

  const handleEdit = () => {
    if (text.trim()) {
      onPress(text)
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
          <View style={styles.formHeader}>
            <CustomTitle text={title} />
            <CustomButton
              variant="default"
              textSize="sm"
              title={buttonText}
              textStyles={styles.button}
              containerStyles={{
                opacity: !text.trim() ? 0.5 : 1,
                height: 32,
              }}
              onPress={handleEdit}
              disabled={!text.trim()}
            />
          </View>
          <Input
            textSize="lg"
            placeholder={placeholderText}
            handleTextChange={setText}
            value={text}
            onSubmitEditing={handleEdit}
            variant="ghost"
            containerStyle={styles.inputContainer}
            multiline={multiLineInput}
            ref={inputRef}
            autoCapitalize="none"
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
    paddingTop: 244,
  },
  modalContainer: {
    height: "100%",
    backgroundColor: theme.colors.white,
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    alignItems: "flex-end",
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 0,
    marginVertical: 10,
  },
  button: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: 13,
    lineHeight: 14,
  },
})
