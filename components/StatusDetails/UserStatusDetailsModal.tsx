import CustomText from "@/components/ui/CustomText"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Friend, Signal, SignalReplyStatus, User } from "@/types"
import UserAvailability from "@/components/cards/UserAvailability"
import { theme } from "@/theme"
import PenIcon from "@/components/vectors/PenIcon"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "@/screens/Home"
import { CustomTitle } from "@/components/ui/CustomTitle"
import Badge from "@/components/ui/Badge"
import { FlatList } from "react-native-gesture-handler"
import { useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import ModalBottomSheet from "../ui/ModalBottomSheet"

export default function UserStatusDetailsModal({
  toggleStatusDetailsModal,
  signal,
  user,
}: {
  toggleStatusDetailsModal: () => void
  signal: Signal
  user: User
}) {
  const listRef = useRef(null)
  const navigation = useNavigation<HomeScreenProps>()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["fetch-my-signal"] })
  }, [queryClient])

  const renderFriendSignal = (item: Friend & SignalReplyStatus) => {
    return (
      <View>
        <View style={{ flexDirection: "row", gap: 1 }}>
          <CustomText fontWeight="semibold" size="base">
            {item.names}
          </CustomText>
          {item?.hasReplied && (
            <>
              <CustomText fontWeight="medium"> is </CustomText>
              <Badge
                name={item?.hasAccepted ? "in" : "out"}
                style={
                  item?.hasAccepted
                    ? { backgroundColor: theme.colors.black }
                    : {
                        backgroundColor: theme.colors.black_200,
                        borderWidth: 0,
                      }
                }
                textStyle={
                  item?.hasAccepted
                    ? { color: theme.colors.white }
                    : { color: theme.colors.black }
                }
              />
            </>
          )}
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
    <ModalBottomSheet toggleModalBottomSheet={toggleStatusDetailsModal}>
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
      <FlatList
        ref={listRef}
        data={signal?.friends}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
          gap: 12,
        }}
        ListHeaderComponent={() => (
          <CustomTitle text="Friends invited to join" style={styles.title} />
        )}
        renderItem={({ item }) =>
          renderFriendSignal(item as Friend & SignalReplyStatus)
        }
        keyExtractor={(item) => item.friendId}
        scrollEventThrottle={16}
      />
    </ModalBottomSheet>
  )
}

const styles = StyleSheet.create({
  statusDescriptionContainer: {
    position: "relative",
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  editSignalButton: {
    borderRadius: 100,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    width: 40,
    height: 40,
    borderColor: theme.colors.gray,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -20,
    right: 20,
  },
  title: {
    fontWeight: "600",
    paddingBottom: 20,
  },
})
