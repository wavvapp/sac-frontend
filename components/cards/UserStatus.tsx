import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { Friend, User } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "@/screens/Home"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import UserAvailability from "@/components/cards/UserAvailability"
import { useFriends } from "@/queries/friends"
import { useMySignal } from "@/queries/signal"
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
  const { data: signal } = useMySignal()

  const { data: allFriends } = useFriends()
  const navigation = useNavigation<HomeScreenProps>()

  const friends = useMemo(() => {
    if (!allFriends) return []
    const filteredFriends = allFriends.filter((friend: Friend) =>
      signal?.friendIds?.includes(friend.id || ""),
    )
    return filteredFriends.sort((a, b) =>
      (a.names || "").localeCompare(b.names || ""),
    )
  }, [signal, allFriends])

  const visibleFriends = useMemo(
    () => friends.slice(0, MAX_VISIBLE_FRIENDS),
    [friends],
  )
  const remainingCount = useMemo(
    () => Math.max(friends.length - MAX_VISIBLE_FRIENDS, 0),
    [friends.length],
  )
  const fullFriendsList = useMemo(() => {
    return visibleFriends
      .map((friend: User) => {
        const firstName = friend.names?.split(" ")[0]
        const lastName = friend.names?.split(" ").slice(1).join(" ")
        return `${firstName} ${lastName?.trim().charAt(0)}`.trim()
      })
      .join(", ")
  }, [visibleFriends])

  const visibleFriendsList = useMemo(() => {
    return remainingCount > 0
      ? `${fullFriendsList}, +${remainingCount} more`
      : fullFriendsList
  }, [remainingCount, fullFriendsList])

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
          {user && signal && (
            <UserAvailability
              fullName={user.names}
              time={signal.when}
              activity={signal.status_message}
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
