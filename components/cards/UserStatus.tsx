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
import { useFriends } from "@/queries/friends"
import { useMySignal } from "@/queries/signal"
import { useMemo } from "react"

const MAX_VISIBLE_FRIENDS = 4

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
    if (!fullFriendsList) return ""
    return remainingCount > 0 ? `${fullFriendsList}...` : `${fullFriendsList}.`
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
      <Animated.View
        style={[styles.animationContainer, style, cardAnimatedStyle]}
        {...rest}>
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => navigation.push("EditSignal", { isNewSignal: false })}>
          {user && signal && (
            <View style={styles.signalContainer}>
              <CustomText style={styles.name} fontWeight="semibold">
                {user.names}
              </CustomText>
              <View style={styles.signal}>
                <CustomText
                  fontFamily="writer-monos"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.status}>
                  {signal.status_message}
                </CustomText>
                <View style={styles.dot} />
                <CustomText style={styles.time} fontFamily="writer-monos">
                  {signal.when}
                </CustomText>
              </View>
            </View>
          )}
          <View style={{ opacity: 0.5 }}>
            <CustomText size="sm" fontFamily="writer-monos">
              {friends.length
                ? `Visible to ${friends.length} ${friends.length === 1 ? "friend" : "friends"}`
                : "This status is not visible to anyone."}
            </CustomText>
            <CustomText size="sm" fontFamily="writer-monos">
              {visibleFriendsList
                ? `${visibleFriendsList}`
                : "Tap to edit your preferences."}
            </CustomText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    maxHeight: 140,
  },
  animationContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    minWidth: "100%",
  },
  signalContainer: {
    gap: 1,
  },
  signal: {
    flexDirection: "row",
    gap: 6,
  },
  name: {
    maxWidth: "70%",
  },
  time: {
    opacity: 0.5,
    textTransform: "capitalize",
  },
  status: {
    maxWidth: "70%",
  },
  dot: {
    backgroundColor: theme.colors.black,
    opacity: 0.5,
    height: 2,
    width: 2,
    borderRadius: 2,
    marginTop: 12,
  },
  userContainer: {
    gap: 24,
    padding: 20,
    justifyContent: "space-between",
  },
})
