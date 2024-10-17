import { StyleSheet, TouchableOpacity, View, Modal } from "react-native"
import React, { useState } from "react"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import EditAvailability from "@/screens/EditAvailability"

export default function Activity() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [availabilityText, setAvailabilityText] = useState("Available")

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)

  const updateAvailabilityText = (newText: string) => {
    setAvailabilityText(newText)
    closeModal()
  }

  return (
    <View style={styles.container}>
      <CustomText size="sm" fontWeight="medium" style={styles.signalText}>
        Signal
      </CustomText>
      <View style={styles.availableContainer}>
        <CustomText size="xl">{availabilityText}</CustomText>
        <TouchableOpacity onPress={openModal}>
          <EditIcon />
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={closeModal}>
          <EditAvailability
            closeModal={closeModal}
            updateAvailabilityText={updateAvailabilityText}
          />
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    width: "100%",
    paddingLeft: 12,
    paddingRight: 21,
    paddingVertical: 5,
  },
  signalText: {
    lineHeight: 17,
    letterSpacing: -1,
    textTransform: "uppercase",
  },
  availableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
