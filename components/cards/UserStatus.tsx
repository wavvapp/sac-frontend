import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { User } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "@/screens/Home"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import UserAvailability from "@/components/cards/UserAvailability"
import { useFriends } from "@/hooks/useFriends"
import { useFetchMySignal } from "@/hooks/useSignal"
import { useMemo } from "react"

const MAX_VISIBLE_FRIENDS = 3

interface UserStatusProps extends ViewStyle {
  user: User | null
  style?: ViewStyle
  isOn: SharedValue<boolean>
}
export default function UserStatus({
  user,
  style,
  isOn,
  ...rest
}: UserStatusProps) {
  const { data: signalData } = useFetchMySignal()

  const { friends: signalFriends } = useFriends()
  const navigation = useNavigation<HomeScreenProps>()

  const friends = useMemo(() => {
    return signalFriends.filter((friend) =>
      signalData.friendIds?.includes(friend.id),
    )
  }, [signalData, signalFriends])

  const visibleFriends = friends.slice(0, MAX_VISIBLE_FRIENDS)
  const remainingCount = Math.max(friends.length - MAX_VISIBLE_FRIENDS, 0)
  const fullFriendsList = visibleFriends
    .map((friend) => {
      const firstName = friend.names?.split(" ")[0]
      const lastName = friend.names?.split(" ").slice(1).join(" ")
      return `${firstName} ${lastName?.charAt(0)}`
    })
    .join(", ")

  const visibleFriendsList =
    remainingCount > 0
      ? `${fullFriendsList}, +${remainingCount} more`
      : fullFriendsList

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isOn.value), [0, 1], [0, 1])
    const opacity = withTiming(moveValue, { duration: 400 })

    return {
      opacity,
      pointerEvents: isOn.value ? "auto" : "none",
    }
  })

  return (
    <View style={styles.container}>
      {!isOn.value && (
        <View style={styles.headlineTextContainer}>
          <CustomText fontFamily="writer-mono" style={styles.headlineText}>
            Turn it on to signal your availability
          </CustomText>
        </View>
      )}
      <Animated.View
        style={[styles.animationContainer, style, cardAnimatedStyle]}
        {...rest}>
        <View style={styles.userContainer}>
          {user && (
            <UserAvailability
              fullName={user.names}
              time={signalData.when}
              activity={signalData.status_message}
            />
          )}
          <View style={{ opacity: 0.5 }}>
            <CustomText size="sm" fontFamily="writer-mono">
              {friends.length
                ? `Visible to ${friends.length} friends`
                : "This status is not visible to anyone"}
            </CustomText>
            <CustomText size="sm" fontFamily="writer-mono">
              {visibleFriendsList
                ? `${visibleFriendsList}.`
                : "Tap to edit your preferences."}
            </CustomText>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <CustomText
            onPress={() => navigation.push("EditSignal")}
            size="sm"
            fontWeight="semibold"
            style={styles.editButtonText}>
            Tap to edit
          </CustomText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  animationContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    minWidth: "100%",
  },
  userContainer: {
    gap: 24,
    padding: 20,
    justifyContent: "space-between",
    flexGrow: 1,
  },
  editButton: {
    backgroundColor: theme.colors.black,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: -1,
  },
  editButtonText: {
    color: theme.colors.white,
    textAlign: "center",
    padding: 10,
    textTransform: "uppercase",
  },
  headlineTextContainer: {
    maxWidth: 277,
    position: "absolute",
    bottom: 0,
  },
  headlineText: {
    color: theme.colors.white,
    textAlign: "center",
  },
})
