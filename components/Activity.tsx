import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native"
import { useRef, useState } from "react"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import EditActivity from "@/screens/EditActivity"
import { useStatus } from "@/contexts/StatusContext"
import { theme } from "@/theme"
import { capitalizeFirstLetter } from "@/utils"

export default function Activity({ isLoading }: { isLoading: boolean }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { temporaryStatus } = useStatus()
  const inputRef = useRef<TextInput>(null)

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const triggerKeyboardFocus = () => {
    inputRef.current?.focus()
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

      {isModalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          presentationStyle="overFullScreen"
          onRequestClose={closeModal}
          onShow={triggerKeyboardFocus}>
          <EditActivity closeModal={closeModal} inputRef={inputRef} />
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
