import { CustomButton } from "@/components/ui/Button"
import { CustomTitle } from "@/components/ui/CustomTitle"
import Input from "@/components/ui/Input"
import { theme } from "@/theme"
import { ReactNode, Ref, useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ViewProps,
} from "react-native"

interface EditActivityProps extends ViewProps {
  title: string
  placeholderText: string
  initialInputValue: string
  buttonText: string
  onPress: (text: string) => void
  closeModal: () => void
  inputRef: Ref<TextInput>
  multiLineInput?: boolean
  children?: ReactNode
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
  children,
}: EditActivityProps) {
  const [text, setText] = useState(initialInputValue)

  const [inputHeigt, setInputHeight] = useState<number>(42)
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
            style={[
              styles.inputContainer,
              { height: Math.max(42, inputHeigt) },
            ]}
            onContentSizeChange={(event) => {
              setInputHeight(event.nativeEvent.contentSize.height)
            }}
            multiline={multiLineInput}
            ref={inputRef}
            autoCapitalize="none"
          />
          {children}
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
    paddingVertical: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  button: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: 13,
    lineHeight: 14,
  },
})
