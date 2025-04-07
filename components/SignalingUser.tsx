import { Friend } from "@/types"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import UserAvailability from "@/components/cards/UserAvailability"
import UserInfo from "@/components/UserInfo"
import { theme } from "@/theme"
import { useEnableFriendNotification } from "@/hooks/useEnableFriendNotification"
import CustomText from "@/components/ui/CustomText"

interface SignalingUserProps {
  user: Friend
  online: boolean
  isLast: boolean
  isFirst: boolean
  hasNotificationEnabled: boolean
  onReply: (user: Friend) => void
}

export default function SignalingUser({
  user,
  online,
  isLast,
  isFirst,
  hasNotificationEnabled,
  onReply,
}: SignalingUserProps) {
  const { changePreferences } = useEnableFriendNotification()

  return (
    <>
      <View
        style={[
          styles.userCard,
          isLast && styles.lastCardInTheListStyles,
          isFirst && styles.firstCardInTheListStyles,
          online && styles.availableUserContainer,
        ]}>
        <View style={{ flex: 1 }}>
          {online ? (
            <UserAvailability
              onChangeNotificationStatus={() => {
                changePreferences(user)
              }}
              fullName={user.names}
              time={user?.time}
              activity={user.activity}
              hasNotificationEnabled={hasNotificationEnabled}
              showNotificationIcon
            />
          ) : (
            <UserInfo
              onChangeNotificationStatus={() => {
                changePreferences(user)
              }}
              fullName={user.names}
              username={user.username}
              showNotificationIcon={true}
              showUsername={true}
            />
          )}
        </View>
        {/*{online && (*/}
        <TouchableOpacity onPress={() => onReply(user)}>
          <CustomText
            style={styles.badgeText}
            fontFamily="writer-monov"
            size="sm"
            fontWeight="medium">
            Reply
          </CustomText>
        </TouchableOpacity>
        {/*)}*/}
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  lastCardInTheListStyles: {
    paddingBottom: 20,
  },
  firstCardInTheListStyles: {
    paddingTop: 20,
  },
  availableUserContainer: {
    backgroundColor: theme.colors.white,
  },
  badgeText: {
    textTransform: "uppercase",
    borderColor: theme.colors.black,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontWeight: "700",
    opacity: 0.5,
  },
})
