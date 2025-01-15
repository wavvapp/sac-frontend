import { theme } from "@/theme"
import { useCallback, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import Animated, {
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"

export const FriendsSkeleton = () => {
  const opacity = useSharedValue(0.5)
  const animateLoader = useCallback(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 }),
      ),
      -1,
      true,
    )
  }, [opacity])
  useEffect(() => animateLoader(), [animateLoader])
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))
  return (
    <View style={styles.friendItem}>
      <View style={styles.userDetails}>
        <Animated.View style={[styles.avatarSkeleton, animatedStyle]} />
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Animated.View style={[styles.nameSkeleton, animatedStyle]} />
          <Animated.View style={[styles.usernameSkeleton, animatedStyle]} />
        </View>
      </View>
      <Animated.View style={[styles.buttonSkeleton, animatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  friendItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingVertical: 10,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarSkeleton: {
    width: 56,
    height: 56,
    borderRadius: 40,
    backgroundColor: theme.colors.gray,
  },
  nameSkeleton: {
    width: 150,
    height: 16,
    borderRadius: 4,
    backgroundColor: theme.colors.gray,
    marginBottom: 4,
  },
  usernameSkeleton: {
    width: 100,
    height: 14,
    borderRadius: 4,
    backgroundColor: theme.colors.gray,
  },
  buttonSkeleton: {
    width: 60,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray,
  },
})
