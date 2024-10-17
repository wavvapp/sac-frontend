import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"

const { height } = Dimensions.get("window")

interface EditAvailabilityProps {
  closeModal: () => void
  updateAvailabilityText: (newText: string) => void
}

export default function EditAvailability({
  updateAvailabilityText,
}: EditAvailabilityProps) {
  const [text, setText] = useState("")

  const handleEdit = () => {
    updateAvailabilityText(text)
  }

  const handleKeyPress = (
    nativeEvent: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (nativeEvent.nativeEvent.key === "Enter") {
      handleEdit()
      Keyboard.dismiss()
    }
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <CustomText fontWeight="normal" fontFamily="suisse" size="lg">
          Status
        </CustomText>
        <Input
          textSize="lg"
          placeholder="Available"
          handleTextChange={setText}
          value={text}
          onSubmitEditing={handleEdit}
          onKeyPress={handleKeyPress}
          variant="ghost"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    height: height * 0.7,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
})
