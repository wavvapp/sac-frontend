import React, { useState } from "react"
import { View, StyleSheet, TextInput, Dimensions } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { useNavigation } from "@react-navigation/native"

const { height } = Dimensions.get("window")

export default function EditAvailability() {
  const [text, setText] = useState("")
  const navigation = useNavigation()

  const handleEdit = () => {
    console.log("Edited Text:", text)
    navigation.goBack()
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <CustomText
          fontWeight="normal"
          fontFamily="suisse"
          fontStyle="normal"
          size="md">
          Status
        </CustomText>
        <TextInput
          style={styles.input}
          placeholder="AVAILABLE"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleEdit}
          returnKeyType="done"
          blurOnSubmit={true}
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
  input: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
    marginTop: 20,
  },
})
