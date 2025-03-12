import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import CustomSwitch from "@/components/ui/CustomSwitch"
import CustomText from "@/components/ui/CustomText"
import UserInfo from "@/components/UserInfo"
import { useEnableFriendNotification } from "@/hooks/useEnableFriendNotification"
import { useFriends } from "@/queries/friends"
import { theme } from "@/theme"
import { Friend } from "@/types"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { StyleSheet, TouchableOpacity, View } from "react-native"

export default function NotificationPreferences() {
  const { data: allFriends, isLoading } = useFriends(true)
  const { changePreferences } = useEnableFriendNotification()

  const renderFriend = ({ item: friend }: { item: Friend }) => (
    <TouchableOpacity
      key={friend.id}
      style={styles.friendContainer}
      disabled={false}
      onPress={() => changePreferences(friend)}>
      <UserInfo
        fullName={friend.names}
        username={friend.username}
        style={styles.friendInfo}
      />
      <CustomSwitch
        onPress={() => changePreferences(friend)}
        switchTrackBackground={
          friend.hasNotificationEnabled
            ? theme.colors.black
            : theme.colors.black_200
        }
        thumbBackground={theme.colors.white}
        isOn={friend?.hasNotificationEnabled}
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText size="lg" fontWeight="semibold">
          Stay in the Loop with Your Friends
        </CustomText>
        <CustomText>
          Pick which friends you want to get notifications from. You’re in
          control—switch them on or off anytime!
        </CustomText>
      </View>
      <BottomSheetFlatList
        data={allFriends}
        keyExtractor={(friend) => friend.id}
        renderItem={renderFriend}
        ListEmptyComponent={
          isLoading ? (
            <FriendsSkeleton />
          ) : (
            <CustomText size="sm">You currently have no friends!</CustomText>
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.friendsList}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  header: {
    gap: 6,
    marginBottom: 24,
  },
  friendsList: {
    paddingBottom: 12,
  },
  friendContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  friendInfo: {
    flex: 1,
  },
})
