import CustomText from "@/components/ui/CustomText"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import UserStatusDetailsBottomSheet from "@/components/StatusDetails/UserStatusDetailsBottomSheet"
import { Friend, Signal, User } from "@/types"
import UserAvailability from "@/components/cards/UserAvailability"
import { theme } from "@/theme"
import PenIcon from "@/components/vectors/PenIcon"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "@/screens/Home"
import { CustomTitle } from "@/components/ui/CustomTitle"
import Badge from "@/components/ui/Badge"

export default function UserStatusDetails({
  toggleStatusDetailsModal,
  signal,
  user,
}: {
  toggleStatusDetailsModal: () => void
  signal: Signal
  user: User
}) {
  const navigation = useNavigation<HomeScreenProps>()
  const renderFriendSignal = (item: Friend) => {
    return (
      <View>
        <View style={{ flexDirection: "row", gap: 1 }}>
          <CustomText fontWeight="bold" size="base">
            {item.names}
          </CustomText>
          <CustomText fontWeight="medium"> is </CustomText>
          <Badge name="in" />
        </View>
        <CustomText
          fontFamily="writer-monov"
          style={{ color: theme.colors.black, opacity: 0.5, marginTop: -4 }}>
          @{item.username}
        </CustomText>
      </View>
    )
  }

  return (
    <UserStatusDetailsBottomSheet
      toggleStatusDetailsModal={toggleStatusDetailsModal}
      data={signal?.friends}
      renderTitle={() => (
        <CustomTitle text="Friends invited to join" style={styles.title} />
      )}
      renderSignalDescription={() => (
        <View style={styles.statusDescriptionContainer}>
          <UserAvailability
            fullName={user.names}
            time={signal.when}
            activity={signal.status_message}
          />
          <TouchableOpacity
            onPress={() => {
              toggleStatusDetailsModal()
              navigation.push("EditSignal", { isNewSignal: false })
            }}
            style={styles.editSignalButton}>
            <PenIcon stroke={theme.colors.black} strokeOpacity={0.5} />
          </TouchableOpacity>
        </View>
      )}
      renderData={({ item }) => renderFriendSignal(item as Friend)}
    />
  )
}

const styles = StyleSheet.create({
  statusDescriptionContainer: {
    position: "relative",
    paddingBottom: 28,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  editSignalButton: {
    borderRadius: 100,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    padding: 10,
    borderColor: theme.colors.gray,
    position: "absolute",
    bottom: -20,
    right: 20,
  },
  title: {
    fontWeight: "600",
    paddingBottom: 20,
  },
})
