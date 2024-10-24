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

const MAX_VISIBLE_FRIENDS = 3

interface UserStatusProps extends ViewStyle {
  friends: User[] | []
  user: User
  style?: ViewStyle
  isOn: SharedValue<boolean>
}
export default function UserStatus({
  friends = [],
  user,
  style,
  isOn,
  ...rest
}: UserStatusProps) {
  const navigation = useNavigation<HomeScreenProps>()
  const visibleFriends = friends.slice(0, MAX_VISIBLE_FRIENDS)
  const remainingCount = Math.max(friends.length - MAX_VISIBLE_FRIENDS, 0)

  const fullFriendsList = visibleFriends
    .map((friend) => `${friend.firstName} ${friend.lastName.charAt(0)}`)
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
    }
  })

  return (
    <View>
      <Animated.View>
        <CustomText size="base" style={styles.headlineText}>
          What are you up to, today?
        </CustomText>
      </Animated.View>
      <Animated.View
        style={[styles.container, style, cardAnimatedStyle]}
        {...rest}>
        <View style={styles.userContainer}>
          <UserAvailability
            firstName={user.firstName}
            lastName={user.lastName}
            time={user.time}
            activity={user.activity}
          />
        </View>
        <View style={styles.friendsContainer}>
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
    backgroundColor: theme.colors.white,
    paddingTop: 24,
    gap: 24,
    borderRadius: 12,
    overflow: "hidden",
  },
  userContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendsContainer: {
    marginHorizontal: 24,
  },
  editButton: {
    padding: 10,
    backgroundColor: theme.colors.black,
  },
  editButtonText: {
    color: theme.colors.white,
    textAlign: "center",
  },
  headlineText: {
    paddingTop: 24,
    position: "absolute",
    color: theme.colors.white,
    textAlign: "center",
    alignSelf: "center",
    minHeight: 189,
  },
})
