import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native"
import { useState } from "react"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import EditActivity from "@/screens/EditActivity"
import { useStatus } from "@/contexts/StatusContext"
import { theme } from "@/theme"
export default function Activity() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { statusMessage, isLoading } = useStatus()

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.black} />
  }
  return (
    <View style={styles.container}>
      <CustomText size="base" fontWeight="medium">
        Status
      </CustomText>
      <TouchableOpacity onPress={openModal} style={styles.statusContainer}>
        <CustomText size="lg" fontWeight="semibold" style={styles.statusText}>
          {statusMessage}
        </CustomText>
        <EditIcon />
      </TouchableOpacity>

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          presentationStyle="overFullScreen"
          statusBarTranslucent={true}
          onRequestClose={closeModal}>
          <EditActivity closeModal={closeModal} />
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusText: {
    flex: 1,
  },
})
