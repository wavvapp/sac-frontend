import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native"
import { useRef, useState } from "react"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import EditActivity from "@/screens/EditActivity"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { theme } from "@/theme"
import { capitalizeFirstLetter } from "@/utils"
import BottomModal from "@/components/BottomModal"
import { CustomTitle } from "@/components/ui/CustomTitle"

export default function Activity({ isLoading }: { isLoading: boolean }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const inputRef = useRef<TextInput>(null)

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const updateStatus = (text: string) => {
    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      activity: text.trim(),
    }))
  }
  const triggerKeyboardFocus = () => {
    inputRef.current?.focus()
  }
  return (
    <View style={styles.container}>
      <CustomTitle text="your wavv" />
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
      <BottomModal
        visible={isModalVisible}
        onShow={triggerKeyboardFocus}
        onClose={closeModal}>
        <EditActivity
          closeModal={closeModal}
          title="Your wavv"
          placeholderText="Status message"
          buttonText="Done"
          initialInputValue={temporaryStatus.activity}
          onPress={updateStatus}
          inputRef={inputRef}
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
