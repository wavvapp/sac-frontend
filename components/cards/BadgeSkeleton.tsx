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

export const BadgeSkeleton = () => {
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
    <View style={styles.badgeContainer}>
      <Animated.View style={[styles.badgeSkeleton, animatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.gray,
  },
  badgeSkeleton: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
})
