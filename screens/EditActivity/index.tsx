import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import { theme } from "@/theme"
import { Ref, useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      onStartShouldSetResponder={() => true}>
      <View style={styles.formHeader}>
        <CustomText>{title}</CustomText>
        <CustomButton
          variant="default"
          textSize="sm"
          title={buttonText}
          textStyles={styles.button}
          containerStyles={{
            opacity: !text.trim() ? 0.5 : 1,
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
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
})
