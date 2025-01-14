import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native"
import { useState } from "react"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import EditActivity from "@/screens/EditActivity"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { theme } from "@/theme"
import { capitalizeFirstLetter } from "@/utils"
import BottomModal from "@/components/BottomModal"

export default function Activity({ isLoading }: { isLoading: boolean }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { temporaryStatus, setTemporaryStatus } = useStatus()

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const updateStatus = (text: string) => {
    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      activity: text.trim(),
    }))
  }
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
              {capitalizeFirstLetter(temporaryStatus.activity)}
            </CustomText>
            <EditIcon />
          </>
        )}
      </TouchableOpacity>
      <BottomModal visible={isModalVisible} onClose={closeModal}>
        <EditActivity
          closeModal={closeModal}
          title="Status"
          placeholderText="Status message"
          buttonText="Done"
          initialInputValue={temporaryStatus.activity}
          onPress={updateStatus}
        />
      </BottomModal>
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
