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
// import { useStatus } from "@/contexts/StatusContext"
import { theme } from "@/theme"
import { useFetchMySignal } from "@/hooks/useSignal_"
export default function Activity({ isLoading }: { isLoading: boolean }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { data: signalData } = useFetchMySignal()

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  return (
    <View style={styles.container}>
      <CustomText size="base" fontWeight="medium">
        Status
      </CustomText>
      <TouchableOpacity onPress={openModal} style={styles.statusContainer}>
        {isLoading ? (
          <ActivityIndicator
            style={styles.loaderIcon}
            size="small"
            color={theme.colors.black}
          />
        ) : (
          <>
            <CustomText
              size="lg"
              fontWeight="semibold"
              style={styles.statusText}>
              {signalData.status_message}
            </CustomText>
            <EditIcon />
          </>
        )}
      </TouchableOpacity>

      {isModalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          presentationStyle="overFullScreen"
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
  loaderIcon: {
    marginVertical: 4,
    marginHorizontal: "auto",
  },
})
