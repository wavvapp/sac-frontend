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
  hasReplied?: boolean
  hasAccepted?: boolean
}

export default function SignalingUser({
  user,
  online,
  isLast,
  isFirst,
  hasNotificationEnabled,
  onReply,
  hasReplied,
  hasAccepted,
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
        {online && (
          <TouchableOpacity
            style={[
              styles.badge,
              !hasReplied
                ? null
                : hasAccepted
                  ? styles.iamInBadgeStyle
                  : styles.iamOutBadgeStyle,
            ]}
            onPress={() => onReply(user)}>
            <CustomText
              style={[
                styles.badgeText,
                !hasReplied
                  ? null
                  : hasAccepted
                    ? styles.iamInBadgeTextStyle
                    : styles.iamOutBadgeTextStyle,
              ]}
              fontFamily="writer-monov"
              size="sm"
              fontWeight="medium">
              {!hasReplied ? "Reply" : hasAccepted ? "I'm in" : "I'm out"}
            </CustomText>
          </TouchableOpacity>
        )}
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
  badge: {
    borderColor: theme.colors.black_200,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  badgeText: {
    textTransform: "uppercase",
    fontWeight: "600",
    opacity: 0.5,
  },
  iamInBadgeTextStyle: {
    color: theme.colors.white,
    opacity: 1,
  },
  iamOutBadgeTextStyle: {
    color: theme.colors.black,
    opacity: 0.8,
  },
  iamInBadgeStyle: {
    opacity: 1,
    backgroundColor: theme.colors.black,
  },
  iamOutBadgeStyle: {
    backgroundColor: theme.colors.black_200,
    opacity: 0.5,
    borderWidth: 0,
  },
})
