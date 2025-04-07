import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { Friend, User } from "@/types"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import { useFriends } from "@/queries/friends"
import { useMemo } from "react"
import UserAvailability from "./UserAvailability"
import { useStatus } from "@/contexts/StatusContext"
import UsersIcon from "@/components/vectors/UsersIcon"
import CircleCheck from "@/components/vectors/CircleCheck"
import CircleX from "@/components/vectors/CircleX"

interface UserStatusProps extends ViewStyle {
  user: User | null
  style?: ViewStyle
  isOn: SharedValue<boolean>
  onOpenStatusDetails: () => void
}
export default function UserStatus({
  user,
  style,
  isOn,
  onOpenStatusDetails,
  ...rest
}: UserStatusProps) {
  const { signal } = useStatus()

  const { data: allFriends } = useFriends()

  const friends = useMemo(() => {
    if (!allFriends) return []
    const filteredFriends = allFriends.filter((friend: Friend) =>
      signal?.friendIds?.includes(friend.id || ""),
    )
    return filteredFriends.sort((a, b) =>
      (a.names || "").localeCompare(b.names || ""),
    )
  }, [signal, allFriends])

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
          onPress={onOpenStatusDetails}>
          {user && signal && (
            <UserAvailability
              activity={signal.status_message}
              fullName={user.names}
              time={signal.when}
            />
          )}
          <View style={styles.statusStatContainer}>
            <View style={styles.statusStat}>
              <UsersIcon
                color={theme.colors.black}
                strokeWidth={2.4}
                width={16}
                height={16}
              />
              <CustomText fontFamily="writer-monos" fontWeight="bold">
                {friends.length}
              </CustomText>
            </View>
            <View style={styles.statusStat}>
              <CircleCheck stroke={theme.colors.black} strokeWidth={1.5} />
              <CustomText fontFamily="writer-monos" fontWeight="bold">
                2
              </CustomText>
            </View>
            <View style={styles.statusStat}>
              <CircleX
                stroke={theme.colors.black_50}
                strokeWidth={1.5}
                width={16}
                height={16}
              />
              <CustomText fontFamily="writer-monos" fontWeight="bold">
                0
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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
  },
  statusStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusStatContainer: {
    flexDirection: "row",
    gap: 16,
    opacity: 0.5,
  },
})
