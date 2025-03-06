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
import BottomModal from "@/components/BottomModal"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { options } from "@/data/default-wavv-options"
import Badge from "@/components/ui/Badge"
import { ScrollView } from "react-native-gesture-handler"

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
              {temporaryStatus.activity}
            </CustomText>
            <View style={styles.EditIcon}>
              <EditIcon />
            </View>
          </>
        )}
      </TouchableOpacity>
      <BottomModal
        visible={isModalVisible}
        onShow={triggerKeyboardFocus}
        onClose={closeModal}>
        <EditActivity
          closeModal={closeModal}
          title="whats your wavv"
          placeholderText="Enter your plan or pick an option"
          buttonText="Save"
          initialInputValue={temporaryStatus.activity}
          onPress={updateStatus}
          inputRef={inputRef}>
          <View style={styles.line} />
          <ScrollView contentContainerStyle={styles.badgesContainer}>
            {options.map((slot) => (
              <TouchableOpacity onPress={() => updateStatus(slot)} key={slot}>
                <Badge
                  name={slot}
                  variant={
                    temporaryStatus.activity.toLowerCase() ===
                    slot.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  style={styles.badge}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </EditActivity>
      </BottomModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    flex: 1,
    alignItems: "center",
  },
  loaderIcon: {
    marginVertical: 4,
    marginHorizontal: "auto",
  },
  EditIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.gray,
    marginBottom: 16,
  },
  badgesContainer: {
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 20,
  },
  badge: {
    fontFamily: theme.fontFamily["writer-mono"].normal?.normal,
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    fontSize: theme.fontSize.sm,
    borderColor: theme.colors.gray,
    letterSpacing: 0.003,
  },
})
