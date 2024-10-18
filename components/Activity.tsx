import { StyleSheet, TouchableOpacity, View, Modal } from "react-native"
import { useState } from "react"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import EditActivity from "@/screens/EditActivity"

export default function Activity() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activity, setActivity] = useState("Available")

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)

  const updateAvailabilityText = (newText: string) => {
    setActivity(newText)
    closeModal()
  }

  return (
    <View style={styles.container}>
      <CustomText size="sm" fontWeight="medium" style={styles.titleText}>
        Status
      </CustomText>
      <View style={styles.statusContainer}>
        <CustomText size="xl">{activity}</CustomText>
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
          <EditActivity
            closeModal={closeModal}
            updateEditActivityText={updateAvailabilityText}
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
  titleText: {
    lineHeight: 17,
    letterSpacing: -1,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
